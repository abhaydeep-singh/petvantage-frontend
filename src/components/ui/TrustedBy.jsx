import Marquee from "react-fast-marquee";

const TrustedBy = () => {
  const companies = [
    { name: "People for animals", logo: "https://www.peopleforanimalsindia.org/front/img/logo.png" },
    { name: "Paws India", logo: "https://www.pawsindia.org/images/paws.gif" },
    { name: "Humane World", logo: "https://www.humaneworld.org/themes/custom/saplings_child/logo.svg" },
    { name: "PETA", logo: "https://www.peta.org/wp-content/themes/peta/src/assets/images/svgs/peta-logo.svg" },
    { name: "Four Paws", logo: "https://media.4-paws.org/1/f/4/4/1f441f9e573923ef15edf3818bd431579ab6ac72/four-paws-logo.svg" },
    { name: "World Animal Protection", logo: "https://vectorseek.com/wp-content/uploads/2024/01/World-Animal-Protection-Logo-Vector.svg-.png" },
    // { name: "Animal", logo: "https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/20100236/ifaw-international-fund-for-animal-welfare1352.logowik.com.webp" },
    
  ];

  return (
    <div className="py-10 bg-gray-600">
      {/* <h2 className="text-5xl font-semibold text-center mb-8 text-black">
        Trusted by Leading NGOs
      </h2> */}
      <Marquee speed={60} gradient={false}>
        {companies.map((company, index) => (
          <div key={index} className="mx-8">
            <img src={company.logo} alt={company.name} className="h-36 h- w-auto" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TrustedBy;
