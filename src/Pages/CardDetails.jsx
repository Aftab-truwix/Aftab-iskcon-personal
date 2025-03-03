import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.webp";
import about3 from "../assets/about3.webp";
import about4 from "../assets/bout4.webp";

const data = [
  {
    id: "about-srila-prabhupada",
    title: "About Srila Prabhupada",
    image: about1,
    description: `"He was a genuine holy person with enormous integrity and compassion, and he had a powerful impact on those who met him. He never claimed authority and respect for himself; what he said and did was always in the name of Krishna." – Dr. Thomas J. Hopkins. <br><br> 
  
    His Divine Grace Srila Prabhupada is the founder-acharya of ISKCON. On September 17, 1965, A.C. Bhaktivedanta Swami Srila Prabhupada entered the port of New York City to introduce an ancient religion originating from India. Although Srila Prabhupada passed away on November 14, 1977, his mission achieved tremendous success.  
  
    Srila Prabhupada founded the International Society for Krishna Consciousness (ISKCON) and established around 108 temples, ashrams, and cultural centers across the world.`,
    desc2: `Abhay Charan Bhaktivedanta Swami Srila Prabhupada was born into a Hindu family on <strong>September 1, 1896</strong>, during British-ruled India. He participated in the civil non-cooperation movement initiated by Mahatma Gandhi, striving for India’s freedom. In 1922, he met the renowned religious leader and scholar, <strong>Srila Bhaktisiddhanta Saraswati Thakur</strong>. This meeting became a milestone in his life. Srila Bhaktisiddhanta urged Abhay Charan to introduce the philosophies of Lord Krishna in the West.  

    In <strong>1933</strong>, Abhay Charan became a disciple of Srila Bhaktisiddhanta and dedicated the next 32 years to preparing for his journey to fulfill his guru’s wish.  
    
    At the age of <strong>69</strong>, with only 40 rupees, a trunk full of books, and a few personal belongings, Srila Prabhupada embarked on the cargo ship <em>Jalduta</em> to New York City. The journey was perilous, and he suffered two heart attacks onboard. After 35 days at sea, he arrived at a lonely Brooklyn port.  
    
    In New York, Srila Prabhupada faced immense hardships. He was often without money or a stable place to live. Despite this, he began his mission humbly—teaching the <em>Bhagavad Gita</em> in lofts in the Bowery and leading <em>kirtan</em> (devotional chants) in Tompkins Square Park. His message of peace and goodwill resonated with the younger generation, particularly the hippie community, many of whom became serious students of <em>Bhakti-yoga</em> (loving devotion to God).  
    
    With the help of his followers, Srila Prabhupada registered his organization, and on <strong>July 11, 1966</strong>, the International Society for Krishna Consciousness (ISKCON) was officially established.  
    
    <strong>Global Impact:</strong><br>  <br>
    Over the next 11 years, Srila Prabhupada traveled around the world <strong>14 times</strong>, spreading the teachings of Lord Krishna across <strong>6 continents</strong>. He inspired men and women from diverse backgrounds to join his mission, establishing ISKCON centers, rural communities, temples, and educational institutes worldwide. His efforts also led to the creation of the largest vegetarian food relief program.  
    
    Returning to India, Srila Prabhupada strengthened the movement by establishing major ISKCON centers in holy towns like <strong>Mayapur</strong> and <strong>Vrindavana</strong>.  
    
    <strong>Literary Contributions:</strong><br>  <br>
    Srila Prabhupada’s greatest legacy lies in his books. He authored over <strong>70 volumes</strong> on Krishna’s traditions, which are highly regarded for their depth, clarity, and authenticity. His works have been translated into <strong>76 languages</strong> and are used as textbooks in numerous colleges. His most famous writings include:  <br>
    - <strong>Bhagavad Gita As It Is</strong>  <br>
    - <strong>30-volumes of Srimad Bhagavatam</strong>  <br>
    - <strong>17-volumes of Sri Chaitanya Charitamrita</strong>  <br>
    
    <br><strong>Achievements of Srila Prabhupada:</strong><br> 
    - Dictated a total of <strong>22,000 pages of text</strong>.  <br>
    - Translated and wrote purports for <strong>18,000 verses</strong> of <em>Srimad Bhagavatam</em>.  <br>
    - Translated and wrote purports for <strong>700 verses</strong> of the <em>Bhagavad Gita</em>.  <br>
    - Translated and wrote purports for <strong>12,555 verses</strong> of <em>Chaitanya Charitamrita</em>.  <br>
    - Published <strong>147 books</strong>.  <br>
    - Wrote <strong>7,000 letters</strong> to his disciples.  <br>
    - Created the <em>Back to Godhead</em> magazine, with <strong>1 million copies</strong> distributed.  <br>
    - Compiled <strong>7 volumes</strong> of <em>Bhagavad Gita</em> lectures.  <br>
    - Compiled <strong>12 volumes</strong> of <em>Srimad Bhagavatam</em> lectures.  <br>
    - Documented conversations with scientists, professors, and editors in <strong>42 volumes</strong> of books.  <br>
    - Produced innumerable recordings.  <br>
    - Transformed the lives of thousands, with <strong>5,000 initiated devotees</strong>.  <br><br>
    
    All of these achievements were accomplished in just <strong>9 years</strong>—between the ages of <strong>70 and 80</strong>. He also established <strong>108 temples</strong> around the world during this time, leaving an extraordinary legacy that continues to inspire millions globally.`
    
  },
  
  {
    id: "history-of-iskcon",
    title: "History Of ISKCON",
    image: about2,
    description: "Known as the Hare Krishna movement on the western side, ISKCON is better recognized as a monotheistic subdivision of the famous Gaudiya Vaishnava religious tradition. Mainly, ISKCON believes in the teaching of Lord Krishna. Chanting the sacred names of God is an essential practice in the Krishna Consciousness. It is one of the major processes of the spiritual service. It is helpful in bringing peace and happiness by enlivening the relationship of humans with God.",
    desc2: `In 1965, His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada (1896–1977), a prominent envoy of spiritual teachings in India, expanded this movement and founded ISKCON in New York.<br><br>
  <strong>Key Milestones of ISKCON History:</strong><br><br>
  - <strong>1965:</strong> Srila Prabhupada left Vrindavan to spread Lord Krishna's teachings in the West. He arrived in Boston with just 40 rupees, a trunk of books, and unwavering determination. Despite initial struggles, his message began to resonate with people.<br>
  - <strong>1966:</strong> Srila Prabhupada formally established ISKCON in New York City after gaining a growing group of followers. Weekly Bhagavad Gita lectures and kirtans (devotional chants) became a cornerstone of his mission.<br>
  - <strong>1966–1968:</strong> Temples were inaugurated in cities like Los Angeles, Seattle, San Francisco, Santa Fe, Montreal, and New Mexico. The first Rath-Yatra festival outside India was celebrated in San Francisco, a tradition now observed globally.<br>
  - <strong>1969–1973:</strong> ISKCON expanded across continents, establishing temples in Canada, Europe, Mexico, Africa, South America, and India. A supervisory body was formed in 1970 to oversee the organization’s growth.<br>
  - <strong>1970–1977:</strong> Major pilgrimage centers were developed in Vrindavan and Mayapur, India. ISKCON’s largest temple was built in Mumbai.<br>
  - <strong>1972:</strong> Srila Prabhupada founded the Bhaktivedanta Book Trust (BBT), now one of the largest publishers of Lord Krishna’s literature. Between 1966 and 1977, Srila Prabhupada translated and published over 40 volumes, including *Srimad Bhagavatam*, *Sri Caitanya Caritamrita*, and *Bhagavad Gita As It Is*.<br>
  - <strong>1973:</strong> The Bhaktivedanta Institute was created to support the teachings of the Vedas.<br>
  - <strong>1974:</strong> ISKCON launched global food relief programs in disaster-stricken areas.<br>
  - <strong>1977:</strong> Srila Prabhupada passed away, leaving behind a flourishing movement with 108 temples, educational centers, and more than 10,000 dedicated members.<br><br>
  <strong>Further Growth and Achievements:</strong><br><br>
  - <strong>1989:</strong> The Hare Krishna movement became a revolutionary force in the Soviet Union, selling over 1 million books by 1991.<br>
  - <strong>1990s:</strong> Several internet projects like ISKCON.com and Krishna.com were launched to share teachings online.<br>
  - <strong>Present Day:</strong> ISKCON now operates more than 500 centers globally, continuing its mission to spread the teachings of Lord Krishna and promote spiritual consciousness worldwide.`
},
  {
    id: "our-philosophy",
    title: "Our Philosophy",
    image: about3,
    description: "The teachings of the International Society for Krishna Consciousness (ISKCON) are based on ancient Vaishnava scriptures: Srimad-Bhagavatam (commentary on the Vedas), Srimad Bhagavad-gita (the personal teachings of Lord Krishna), and Sri Chaitanya-Charitamrta (the teachings of Lord Chaitanya). <br></br>The basic tenet of these teachings is that each living entity is an eternal spirit soul and has a distinct relationship with God, Krishna.",
    desc2: `Lord Chaitanya distinguished Gaudiya Vaishnavism from other sampradayas with the profound philosophy of *acintya bheda bheda tattva*—the understanding that the spirit soul is “inconceivably one and different” from the Supreme Lord. While both share the same spiritual nature qualitatively, the Supreme Lord is unlimited, whereas the spirit soul is His tiny servant. This monotheistic philosophy emphasizes a personal relationship with the Absolute Truth.  

The eternal relationship between Krishna and the devotee (*bhakta*) can be revived through *bhakti-yoga*, the process of serving the Lord with love and devotion. Most importantly, this is achieved by chanting His holy names:  

<strong>Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare,  
Hare Rama, Hare Rama, Rama Rama, Hare Hare</strong>  

The soul’s journey evolves through various bodies until it reaches the ultimate goal: complete love for Krishna. When all actions and thoughts are dedicated solely to Krishna’s pleasure and the soul regains its original purity, it transcends material existence and enters Krishna’s eternal spiritual realm, never returning to this material world.  

To follow this path successfully, one must accept initiation and guidance from a genuine spiritual master in Lord Krishna’s parampara.
<br> At initiation, followers of ISKCON take vows to abstain from:  <br> <br>

<strong>1. Eating meat, fish, and eggs<br>  
2. Intoxication (through drugs and alcohol)<br>  
3. Gambling<br>  
4. Illicit sexual connections</strong>  

<br>   <br>
Additionally, they commit to chanting a minimum of 16 rounds daily of the Hare Krishna maha-mantra using sacred beads, where each round consists of 108 beads. This disciplined practice is fundamental to progressing in devotional service and strengthening one’s connection with Krishna.`

  },
  {
    id: "hare-krishna-movement",
    title: "Hare Krishna Movement",
    image: about4,
    description: "<strong>Learn the history of ISKCON, popularly known as Hare Krishna Movement.</strong><br><br> Hare Krishna chanting is a sure way to get in touch with the divine. Also known as the Maha Mantra, chanting this mantra brings us closer to God. A very important part of the Hare Krishna Movement, the Hare Krishna Chant is definitely synonymous with divinity. But what is the Hare Krishna Movement, and what does chanting God’s name really do? Here, we shall answer such questions for you.",
    desc2: `Dedicated to Lord Krishna, the International Society for Krishna Consciousness (ISKCON) is popularly known as the Hare Krishna Movement. Rooted in the teachings of <em>Srimad Bhagavad Gita</em>, this movement is focused on spreading Krishna consciousness and the holy word of Lord Krishna.  

    A part of the Gaudiya Vaishnava Sampradaya, the Hare Krishna Movement is a monotheistic tradition within the Vedic or Hindu culture. Lord Krishna appeared on earth around five thousand years ago and recited the <em>Bhagavad Gita</em> to teach humanity how to connect with God. To guide the people of Kaliyuga, Lord Krishna later appeared as Sri Chaitanya Mahaprabhu, the combined form of Sri Radha and Sri Krishna, to popularize the chanting of God's holy names and show the path of devotion.  
    
    The Hare Krishna Movement emphasizes that chanting God’s sacred names can free individuals from worldly miseries and lead them to a state of eternal bliss. The holy mantra taught by Sri Chaitanya Mahaprabhu is:  
    <strong>Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare,
    Hare Rama, Hare Rama, Rama Rama, Hare Hare</strong>  
    
    Sri Chaitanya Mahaprabhu focused on the power of listening to and chanting this mantra as a direct means to achieve spiritual liberation and connect with the Supreme Lord.  
    
    <br><br><strong>Further Journey of the Hare Krishna Movement:</strong><br>  
    <strong>1965:</strong> Swami Srila Prabhupada expanded the Hare Krishna Movement by establishing ISKCON in New York. Leaving Vrindavan with a bundle of Lord Krishna’s books, he endured many struggles to spread the teachings of the <em>Bhagavad Gita</em> by delivering weekly lectures.  
    <br><strong>1966:</strong> Srila Prabhupada successfully founded ISKCON in New York, marking the official beginning of the Hare Krishna Movement in the West.  
    <br><strong>1966–1968:</strong> Thousands of people joined the movement, leading to the establishment of temples in major cities like San Francisco, Los Angeles, Santa Fe, Seattle, New Mexico, and Montreal.  
    <br><strong>1970–1977:</strong> Major holy pilgrimage centers were established in India, including Vrindavan, Mayapur, and Mumbai, where the largest ISKCON temple is located.  
    
    Before Srila Prabhupada left his mortal body in 1977, he had established 108 temples worldwide and inspired over 10,000 dedicated members.  
    
    <br><br><strong>The Success of the Hare Krishna Movement:</strong><br>  <br>
    In less than fifty years, the Hare Krishna Movement has achieved remarkable success globally. Today, ISKCON includes: <br> 
    - Over <strong>500 major centers, temples, and rural communities</strong>  <br>
    - Nearly <strong>100 affiliated vegetarian restaurants</strong>  <br>
    - Thousands of <strong>namahattas</strong> (local meeting groups)  <br>
    - A wide variety of <strong>community projects</strong>  <br>
    - Millions of congregational members worldwide  <br>
    
    <br>ISKCON continues to work for various noble causes, inspiring people to embrace Krishna consciousness and serve humanity for the pleasure of the Supreme Lord. By participating in this movement, individuals can lead meaningful lives and achieve spiritual success.`
    
  },
];

const CardDetails = () => {
  const { id } = useParams();
  const card = data.find((item) => item.id === (id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fde3b6] w-full h-full">
      <div className="px-4 md:px-20 pt-4 relative z-50">
        <Navbar />
      </div>
      <div className="px-4 md:px-20 py-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
        <img
          src={card?.image}
          alt={card?.title}
          className="w-full h-auto md:h-96 object-contain rounded-lg mb-6"
        />
        <div>
        <h1 className="text-3xl font-bold mb-4 font-prata">{card?.title}</h1>
        <p className="text-lg font-nunito" dangerouslySetInnerHTML={{ __html: card.description }}></p>
        </div>
        </div>
        
        
        <p className="text-lg mt-2" dangerouslySetInnerHTML={{ __html: card.desc2 }}></p>
      </div>
    </div>
  );
};

export default CardDetails;
