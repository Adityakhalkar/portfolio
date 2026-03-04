import { AGENTS, getAgentBySlug, type Agent } from "../../data/agents";
import AgentDetailClient from "./AgentDetailClient";
import AgentNotFound from "./AgentNotFound";

export function generateStaticParams() {
  return AGENTS.map((agent) => ({ slug: agent.slug }));
}

function getRelatedAgents(agent: Agent): Agent[] {
  return AGENTS.filter(
    (a) => a.category === agent.category && a.slug !== agent.slug
  ).slice(0, 3);
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return <AgentNotFound />;
  }

  const relatedAgents = getRelatedAgents(agent);

  return <AgentDetailClient agent={agent} relatedAgents={relatedAgents} />;
}
