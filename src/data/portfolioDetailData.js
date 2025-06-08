export const portfolioDetails = Array.from({ length: 500 }, (_, index) => {
  const id = index + 1;

  const affiliation = ['취준생', '학생', '직장인'];
  const role = ['FrontEnd', 'BackEnd', 'Designer', 'Engineer'];
  const stacks = ['JavaScript','TypeScript','Python','Java','C#','C++','Ruby','Go','PHP','Swift','Kotlin','Rust','Dart'];

  return {
    id,
    img: `/assets/imgs/test/${(id % 9) + 1}.png`,
    likes: Math.floor(Math.random() * 3000) + 100,
    height: [250, 300, 350, 400, 450][id % 5],
    title: `${id}번째 포트폴리오`,
    subtitle: `서브타이틀`,
    affiliation: affiliation[id % affiliation.length],
    language: [
      stacks[id % stacks.length],
      stacks[(id + 1) % stacks.length],
      stacks[(id + 2) % stacks.length],
    ],
    role: role[id % role.length],
    details: `이 프로젝트는 ${id}번째 예시 프로젝트 입니다.\n`,
    pdfUrl: '/assets/TestPdf/sample.pdf',
    Author : ['user1', 'user2', 'user3', 'user4', 'user5'][id % 5],
  };
});