module.exports = {
  CAREER_PATHS: [
    {
      id: 'fullstack-dev',
      title: 'Full Stack Web Developer',
      category: 'Software Engineering',
      requiredSkills: [
        { name: 'JavaScript', weight: 4 },
        { name: 'React', weight: 4 },
        { name: 'Node.js', weight: 3 },
        { name: 'PostgreSQL', weight: 3 },
        { name: 'Git & GitHub', weight: 2 }
      ]
    },
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      category: 'Software Engineering',
      requiredSkills: [
        { name: 'JavaScript', weight: 5 },
        { name: 'React', weight: 5 },
        { name: 'HTML5', weight: 3 },
        { name: 'CSS3', weight: 3 }
      ]
    },
    {
      id: 'backend-dev',
      title: 'Backend Developer',
      category: 'Software Engineering',
      requiredSkills: [
        { name: 'Node.js', weight: 4 },
        { name: 'Python', weight: 4 },
        { name: 'PostgreSQL', weight: 4 },
        { name: 'Docker', weight: 3 }
      ]
    },
    {
      id: 'ai-ml-engineer',
      title: 'AI & Machine Learning Engineer',
      category: 'Artificial Intelligence',
      requiredSkills: [
        { name: 'Python', weight: 5 },
        { name: 'PyTorch / TensorFlow', weight: 4 },
        { name: 'Linear Algebra', weight: 3 }
      ]
    }
  ]
};
