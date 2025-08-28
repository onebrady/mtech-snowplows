import { KNOWLEDGE_SECTIONS } from "../content/knowledge";
import { SinglePageKnowledge } from "../components/knowledge/SinglePageKnowledge";

export default function SinglePageKnowledgePage() {
  return <SinglePageKnowledge sections={KNOWLEDGE_SECTIONS} />;
}