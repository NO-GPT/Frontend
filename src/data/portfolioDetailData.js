export const portfolioDetails = Array.from({ length: 300 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `${id}번째 포트폴리오`,
    subtitle: `서브타이틀`,
    stacks: ['React', 'TypeScript', 'Figma'].slice(0, (id % 3) + 1),
    role: ['디자이너', 'FrontEnd', 'BackEnd', 'PM'][id % 4],
    details: `이 프로젝트는 ${id}번째 예시 프로젝트 입니다.\n`
  };
});