export const topics = [
  {
    key: 'space',
    title: 'Space',
    description: 'Posts about the moon, earth, the sun, and how scale changes the story you tell.',
    accent: 'violet',
  },
  {
    key: 'rocket',
    title: 'Rocket',
    description: 'Launch notes, staging, thrust, and the mechanics behind one clean ascent.',
    accent: 'blue',
  },
  {
    key: 'nature',
    title: 'Nature',
    description: 'Observed patterns in forests, deserts, weather, and the quieter parts of motion.',
    accent: 'green',
  },
  {
    key: 'cars',
    title: 'Cars',
    description: 'A smaller collection focused on one marque, one design language, and one standard of comfort.',
    accent: 'orange',
  },
] as const;

export type TopicKey = (typeof topics)[number]['key'];

const topicMap = new Map(topics.map((topic) => [topic.key, topic]));

function isTopicKey(topic: string | undefined): topic is TopicKey {
  return topics.some((entry) => entry.key === topic);
}

export function getTopicFromPath(path: string): TopicKey {
  const [topic] = path.split('/');
  return isTopicKey(topic) ? topic : 'space';
}

export function getTopicMeta(topicKey: string) {
  return topicMap.get(topicKey as TopicKey) ?? topicMap.get('space')!;
}
