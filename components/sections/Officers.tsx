export default function Officers() {
  const officers = [
    { name: 'Nicholas Matias', role: 'President', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
    { name: 'Diego Landeata Torres', role: 'Vice-President', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
    { name: 'Axel Fontaine', role: 'Treasurer', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
    { name: 'Adam Vasquez', role: 'Secretary', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
    { name: 'Steven Zapata', role: 'Communications Chair', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
    { name: 'Romina Cruz', role: 'Membership Chair', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
    { name: 'Muhammed Wadiala', role: 'Outreach Chair', likes: 'This', dislikes: 'That', hobbies: 'The Other' },
  ];

  return (
    <section id="Officers" className="w-full bg-[#500000]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch">
          <div className="h-[600px] overflow-y-auto pr-4 space-y-6">
            {officers.map((o) => (
              <div key={o.name} className="flex justify-between bg-[#FAF3E0] p-6 shadow-lg">
                <div>
                  <h3 className="font-lora text-2xl font-bold text-[#000000]">{o.name}</h3>
                  <p className="font-poppins font-medium uppercase tracking-wider text-sm text-[#000000]/70">{o.role}</p>

                  <div className="mt-4 font-poppins text-[#000000] space-y-1">
                    <p>Likes: {o.likes}</p>
                    <p>Dislikes: {o.dislikes}</p>
                    <p>Hobbies: {o.hobbies}</p>
                  </div>
                </div>

                <div className="ml-6 h-28 w-24 bg-[#000000]" />
              </div>
            ))}
          </div>

          <div className="flex flex-col font-inter justify-center text-[#FFFFFF]">
            <h2 className="text-4xl font-semibold underline underline-offset-8 font-poppins">Our Officers</h2>

            <p className="mt-8 leading-relaxed">
              Led by a passionate team of TAMU ColorStack officers, our chapter serves as a local hub of the national
              ColorStack network, creating pathways for students of color in computing to succeed, connect, and lead.
              Officers collaborate to host workshops, tech-building sessions, and networking events that equip members
              for internships and full-time roles in tech.
            </p>

            <p className="mt-6 leading-relaxed">
              Our officers strive to cultivate a welcoming and empowering community where every member feels seen,
              supported, and encouraged to reach their full potential in tech at Texas A&M. By advocating for students
              of color in computing and building strong relationships with both campus and industry partners, they help
              ensure that TAMU ColorStack reflects the core values of its members.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
