const examData = [
    {
      title: "Class 10th Toppers",
      students: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        image: `https://source.unsplash.com/random/150x150?portrait&sig=${i}`,
        percentage: 95 + Math.random() * 5,
        rank: i + 1
      }))
    },
    {
      title: "Class 12th Achievers",
      students: Array.from({ length: 28 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        image: `https://source.unsplash.com/random/150x150?student&sig=${i + 30}`,
        percentage: 92 + Math.random() * 8,
        rank: i + 1
      }))
    },
    {
      title: "CET Stars",
      students: Array.from({ length: 22 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        image: `https://source.unsplash.com/random/150x150?graduate&sig=${i + 60}`,
        percentage: 90 + Math.random() * 10,
        rank: i + 1
      }))
    },
    {
      title: "JEE Champions",
      students: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        image: `https://source.unsplash.com/random/150x150?university&sig=${i + 90}`,
        percentage: 88 + Math.random() * 12,
        rank: i + 1
      }))
    },
    {
      title: "NEET Achievers",
      students: Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        image: `https://source.unsplash.com/random/150x150?medical&sig=${i + 120}`,
        percentage: 89 + Math.random() * 11,
        rank: i + 1
      }))
    }
  ];
  
  