import Image from "next/image";
import heart from './heart.svg';
import heartfill from './heartfill.svg';

const list = [
  {
    concept: "Concept 1 Concept 1 Concept 1 Concept 1 Concept 1 Concept 1 Concept 1",
    definition: "Definition 1",
  },
  {
    concept: "Concept 2",
    definition: "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMake",
  },
  {
    concept: "Concept 3",
    definition: "Definition 3",
  }
]

const ConceptList = () => {
  return (
    <div className="px-3 h-full">
      <h3 className="font-black text-xl mb-12">
        List of concepts in this set
      </h3>
      <div className="flex flex-col gap-2">
        {
          list.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between py-2.5 bg-yellow rounded-2xl px-4 h-full">
              <div className="font-bold text-lg w-full sm:w-1/2 md:w-2/6 py-2 sm:py-0 border-b-3 sm:border-b-0 sm:border-r-3 border-black flex items-center pr-0 sm:pr-2">
                <span>{item.concept}</span>
              </div>
              <div className="font-medium text-md w-full sm:w-1/2 md:w-4/6 sm:pl-2 py-2 md:py-0 flex items-center justify-between flex-wrap md:flex-nowrap">
                <p className="w-fit pr-3 sm:pl-2 py-2 sm:py-0">{item.definition}</p>
                <button
                  className="w-8 h-8 ml-auto"
                >
                  <Image src={heart} alt="Like concept" width={32} height={32} />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default ConceptList