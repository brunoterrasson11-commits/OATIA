import Anthropic from '@anthropic-ai/sdk';
import { buildDiagnosticPrompt, buildRecommandationsPrompt, buildAlertePrompt, buildScenarioPrompt } from '@/lib/prompts';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const {
      territoire,
      indicateurs,
      type = 'diagnostic',
      emploiData = null,
      formationsCtx = null,  // { formations, cats, alerts, suggestions }
    } = await request.json();

    if (!territoire || !indicateurs) {
      return Response.json({ error: 'Paramètres manquants' }, { status: 400 });
    }

    let prompt;
    switch (type) {
      case 'recommandations':
        prompt = buildRecommandationsPrompt(territoire, indicateurs, emploiData, formationsCtx);
        break;
      case 'alertes':
        prompt = buildAlertePrompt(territoire, indicateurs, emploiData, formationsCtx);
        break;
      case 'scenarios':
        prompt = buildScenarioPrompt(territoire, indicateurs, emploiData, formationsCtx);
        break;
      default:
        prompt = buildDiagnosticPrompt(territoire, indicateurs, emploiData, formationsCtx);
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return Response.json({
      success: true,
      contenu: message.content[0].text,
      tokens_used: message.usage.input_tokens + message.usage.output_tokens,
      type,
      territoire: territoire.nom,
      date_generation: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erreur API diagnostic:', error);

    if (error.status === 401) {
      return Response.json({
        error: 'Clé API Anthropic invalide. Vérifiez votre fichier .env.local',
      }, { status: 401 });
    }

    return Response.json({
      error: error.message || 'Erreur lors de la génération du diagnostic',
    }, { status: 500 });
  }
}
