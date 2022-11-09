import Modal from "./UI/Modal";
import { Client, Project } from "@prisma/client";
import { updateProject, UpdateProjectData } from "../lib/projectsFunctions";
import useProjectForm from "../hooks/useProjectForm";
import { getClients } from "../lib/clientFunctions";

const EditProjectModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  currentProjectData: Project;
  clients: Client[];
}> = ({ isOpen, setIsModalOpen, currentProjectData, clients }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  const {
    page,
    setPage,
    name,
    description,
    priority,
    handleNameChange,
    nameBlurHandler,
    isNameError,
    selectedClient,
    handleClientChange,
    clientBlurHandler,
    isClientError,
    handleDescriptionChange,
    resetForm,
    hourlyRate,
    startDate,
    dueDate,
    handlePriorityChange,
    handleEndDateChange,
    handleHourlyRateChange,
    handleStartDateChange,
    validateFirstPageHandler,
    submitHandler,
  } = useProjectForm(closeHandler, currentProjectData);
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <div className="flex flex-col items-center">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            className="w-full"
            viewBox="0 0 787.06663 428.12769"
          >
            <path
              d="M384.646,608.21367a400.444,400.444,0,0,1-3.77512,51.45474c-.08268.59886-.17275,1.19769-.25578,1.7965l-161.217-.9008c-.47335-.59474-.93926-1.19662-1.39067-1.8057-1.50514-2.01572-2.91582-4.08873-4.21082-6.23325-6.22436-10.3314-9.07393-22.42741-6.21838-30.773l.05114-.12968a14.64433,14.64433,0,0,1,2.85818-4.96628c6.5106-7.32867,19.67437-6.107,31.62022-.19158-10.71463-11.72839-19.24628-26.52779-19.89453-39.738-.63561-12.88512,6.10195-22.08987,13.40965-29.91231.23979-.25859.47953-.51.71927-.76137.11636-.12931.23974-.2514.35575-.38072,5.70157-5.96126,12.34862-11.83781,21.9698-11.12695,10.55192.781,22.25086,9.61942,30.45367,19.91855,8.20285,10.29191,13.65383,21.98365,19.179,33.39424,5.53227,11.4034,11.51773,23.09817,20.39527,32.84507-12.024-15.20882-21.71855-32.51307-25.2997-49.34272s-.42948-32.99345,10.28674-40.91958a25.06425,25.06425,0,0,1,10.97874-4.42987c.4623-.07683.93191-.13921,1.4089-.19432,9.92021-1.12872,21.76466,2.30225,31.84216,10.5034,11.09815,9.03006,18.79258,22.41676,22.621,35.1248C384.36161,584.153,384.76957,596.387,384.646,608.21367Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#f2f2f2"
            />
            <path
              d="M279.16848,660.89808l-3.08277-.01723q-1.46826-.918-2.95039-1.81441c-.61167-.38609-1.23046-.7578-1.84957-1.13675q-15.33839-9.36783-30.8686-17.97134-15.51607-8.61064-31.18819-16.42786a1.292,1.292,0,0,1-.74272-1.47718.37233.37233,0,0,1,.05137-.108c.14573-.27357.47144-.38731.9468-.15359,1.28153.64258,2.57046,1.2852,3.8519,1.94224q15.71491,7.951,31.29494,16.69565,15.56928,8.7409,30.96116,18.25343c.21574.13117.4318.26958.64754.40075C277.21848,659.68858,278.19,660.29333,279.16848,660.89808Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M318.917,661.12017l-1.90628-.01065c-.43-.60168-.85249-1.20337-1.28244-1.80509q-15.15248-21.24829-30.2986-42.4966-24.80354-34.78677-49.59224-69.57343a1.22792,1.22792,0,0,1-.21449-.42c-.14133-.51347.23584-.81462.71927-.76137a1.44816,1.44816,0,0,1,1.00723.64105q13.90617,19.50841,27.80537,39.00232,24.6744,34.61277,49.34179,69.21823c1.046,1.46443,2.092,2.936,3.138,4.40046C318.06451,659.91681,318.49446,660.51853,318.917,661.12017Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M361.38558,650.05c-.09728,3.21264-.30991,6.37409-.58761,9.50626q-.08064.89854-.16164,1.797l-2.00007-.01117c.06117-.59894.12234-1.19793.1761-1.797.42263-4.525.7225-9.10116.76322-13.80157a192.53934,192.53934,0,0,0-3.79046-38.81036,241.64483,241.64483,0,0,0-11.73951-40.32059,276.90175,276.90175,0,0,0-19.20756-39.893,1.0655,1.0655,0,0,1-.17656-.7086c.08251-.57.84148-.739,1.4089-.19432a1.65516,1.65516,0,0,1,.28672.36263q1.38395,2.37972,2.71738,4.7736a276.709,276.709,0,0,1,18.38389,40.03277,240.50138,240.50138,0,0,1,10.94448,40.38115A189.95289,189.95289,0,0,1,361.38558,650.05Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M919.86492,567.54652c0-7.732-29.10157-14-65-14s-65,6.268-65,14c0,4.95544,11.96435,9.30621,30,11.79431v76.70569a6.5,6.5,0,0,0,13,0v-75.324c6.87207.53241,14.27685.824,22,.824s15.12793-.29163,22-.824v75.324a6.5,6.5,0,0,0,13,0V579.34083C907.90056,576.85273,919.86492,572.502,919.86492,567.54652Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ccc"
            />
            <circle cx="655.58561" cy="175.46783" r="28" fill="#2f2e41" />
            <polygon
              points="585.905 415.034 573.645 415.034 567.813 367.746 585.907 367.746 585.905 415.034"
              fill="#a0616a"
            />
            <path
              d="M564.88821,411.53062h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H550.00135a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,564.88821,411.53062Z"
              fill="#2f2e41"
            />
            <polygon
              points="566.768 408.192 555.07 404.521 563.662 357.656 580.926 363.073 566.768 408.192"
              fill="#a0616a"
            />
            <path
              d="M751.8009,635.4624h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H736.914a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,751.8009,635.4624Z"
              transform="translate(20.72246 -432.85442) rotate(17.42262)"
              fill="#2f2e41"
            />
            <path
              d="M777.2227,625.26043a4.46207,4.46207,0,0,1-1.572-.28614l-9.01929-3.38183a4.51574,4.51574,0,0,1-2.814-5.1836c2.27075-10.21,10.00976-44.9707,14.24731-63.61523,5.02588-22.11523,78.34278-26.22461,81.46119-26.38867l.25634-.01367,8.24756,10.36425c2.98023,9.57911,2.03565,17.05079-2.80762,22.208-14.13232,15.04688-56.32739,5.71-61.35888,4.52832L781.43608,622.363A4.513,4.513,0,0,1,777.2227,625.26043Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#2f2e41"
            />
            <path
              d="M790.2227,632.26043a4.46207,4.46207,0,0,1-1.572-.28614l-9.01929-3.38183a4.51574,4.51574,0,0,1-2.814-5.1836c2.27075-10.21,10.00976-44.9707,14.24731-63.61523,5.02588-22.11523,78.34278-26.22461,81.46119-26.38867l.25634-.01367,8.24756,10.36425c2.98023,9.57911,2.03565,17.05079-2.80762,22.208-14.13232,15.0459-56.32714,5.71-61.35888,4.52832L794.43608,629.363A4.513,4.513,0,0,1,790.2227,632.26043Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#2f2e41"
            />
            <path
              d="M764.128,488.24044a10.52657,10.52657,0,0,1,.88488,1.40152l49.32026,5.19623,7.09959-9.734,16.09071,8.79449L823.57892,517.52l-60.48739-15.42252a10.49579,10.49579,0,1,1,1.03642-13.857Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#a0616a"
            />
            <path
              d="M878.741,547.72234a4.50062,4.50062,0,0,1-2.04956-.501c-9.8623-5.01464-29.0664-13.69921-46.87451-15.5166a4.39222,4.39222,0,0,1-3.09546-1.75,4.5186,4.5186,0,0,1-.83374-3.51074c1.60694-8.89551,5.29321-31.54687,4.81836-49.70117a24.59626,24.59626,0,0,1,18.582-24.46777h0A79.86638,79.86638,0,0,1,859.201,450.321a24.79543,24.79543,0,0,1,27.55933,28.76172c-3.17578,18.81348-6.3772,45.08985-3.59473,63.43262a4.50689,4.50689,0,0,1-1.8186,4.34863A4.42877,4.42877,0,0,1,878.741,547.72234Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#438f5f"
            />
            <path
              d="M831.61894,499.87078a4.49612,4.49612,0,0,1-1.78662-.37305l-12.8479-5.56152a4.5057,4.5057,0,0,1-2.342-5.917l9.93164-22.94239a11.49973,11.49973,0,1,1,21.10718,9.13575L835.7498,497.155a4.51063,4.51063,0,0,1-4.13086,2.71582Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#438f5f"
            />
            <circle cx="654.56199" cy="182.01901" r="24.56103" fill="#a0616a" />
            <path
              d="M836.02556,405.88808a88.59047,88.59047,0,0,0,38.32618,12.62844l-4.03991-4.84062a29.68836,29.68836,0,0,0,9.17074,1.82106c3.1302-.04875,6.40986-1.254,8.18641-3.83171a9.342,9.342,0,0,0,.62532-8.62974,17.69416,17.69416,0,0,0-5.56637-6.96015,33.1395,33.1395,0,0,0-30.84447-5.51247,19.80612,19.80612,0,0,0-9.21237,5.90942c-2.32839,2.87239-6.811,5.43157-5.6188,8.93167Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#2f2e41"
            />
            <path
              d="M865.15845,386.06722a75.48483,75.48483,0,0,0-27.463-17.7592c-6.63872-2.45942-13.86459-3.97895-20.80509-2.58226s-13.50411,6.19808-15.44041,13.00778c-1.58332,5.56836.05158,11.5638,2.50871,16.80555s5.73758,10.10248,7.72463,15.53986a35.46793,35.46793,0,0,1-35.689,47.56226c6.81938.91438,13.10516,4.11905,19.77076,5.82483s14.53281,1.59011,19.48624-3.18518c5.24092-5.05244,5.34585-13.26719,5.09246-20.54249q-.565-16.22248-1.13-32.445c-.1921-5.51543-.35615-11.20764,1.63288-16.35551s6.71617-9.65569,12.23475-9.60885c4.18253.0355,7.88443,2.56925,11.23866,5.068s6.90445,5.16474,11.07059,5.53641,8.92293-2.71145,8.61118-6.8825"
              transform="translate(-206.46668 -235.93615)"
              fill="#2f2e41"
            />
            <path
              d="M819.73566,541.4132a11.00442,11.00442,0,1,1,4.24194-21.16357h.00024a10.56725,10.56725,0,0,1,1.31153.66455l44.74072-20.08691,1.25683-12.13428,19.28589-.51611-.12768,20.20166a10.88006,10.88006,0,0,1-7.86109,10.34277l-52.322,14.89307a10.25939,10.25939,0,0,1-.35913,1.019,11.04529,11.04529,0,0,1-10.16723,6.77978Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#a0616a"
            />
            <path
              d="M888.93937,498.07985a4.49622,4.49622,0,0,1-1.76188.47641l-13.97358.85916a4.5057,4.5057,0,0,1-4.76751-4.21507l-1.53376-24.95271a11.49972,11.49972,0,1,1,22.956-1.41237l1.534,24.95261a4.51061,4.51061,0,0,1-2.45329,4.292Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#438f5f"
            />
            <path
              d="M779.56963,536.93615h79a3.5,3.5,0,0,1,3.5,3.5v0a3.5,3.5,0,0,1-3.5,3.5h-79a3.5,3.5,0,0,1-3.5-3.5v0A3.5,3.5,0,0,1,779.56963,536.93615Z"
              transform="translate(1431.6726 844.93615) rotate(180)"
              fill="#3f3d56"
            />
            <path
              d="M745.06964,537.43615v-49a6.50737,6.50737,0,0,1,6.5-6.5h89a6.50737,6.50737,0,0,1,6.5,6.5v49a6.50736,6.50736,0,0,1-6.5,6.5h-89A6.50736,6.50736,0,0,1,745.06964,537.43615Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#3f3d56"
            />
            <circle cx="589.60296" cy="277" r="6" fill="#fff" />
            <path
              d="M483.24743,455.27334a10.05575,10.05575,0,0,0-15.32037-1.74408l-31.75443-16.3901,1.974,18.46448,29.8519,12.73351a10.11027,10.11027,0,0,0,15.24888-13.06381Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ffb8b8"
            />
            <path
              d="M455.02714,462.70552a4.505,4.505,0,0,1-3.66895.03914L421.196,449.66058A46.37347,46.37347,0,0,1,397.734,426.963l-15.85695-33.47116a14.49652,14.49652,0,1,1,22.90078-17.78059l27.8727,51.71356,25.73681,19.44154a4.5147,4.5147,0,0,1,1.58663,4.92131l-2.5261,8.15923a4.50568,4.50568,0,0,1-1.52373,2.21147A4.45458,4.45458,0,0,1,455.02714,462.70552Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ccc"
            />
            <circle cx="174.71248" cy="93.63093" r="24.56103" fill="#ffb8b8" />
            <polygon
              points="184.661 415.827 196.92 415.827 202.753 368.539 184.658 368.539 184.661 415.827"
              fill="#ffb8b8"
            />
            <path
              d="M388.50041,648.25979h38.53073a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H403.38727a14.88686,14.88686,0,0,1-14.88686-14.88686v0A0,0,0,0,1,388.50041,648.25979Z"
              transform="translate(609.0948 1075.45169) rotate(179.99738)"
              fill="#2f2e41"
            />
            <polygon
              points="144.661 415.827 156.92 415.827 162.753 368.539 144.658 368.539 144.661 415.827"
              fill="#ffb8b8"
            />
            <path
              d="M348.50041,648.25979h38.53073a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H363.38727a14.88686,14.88686,0,0,1-14.88686-14.88686v0A0,0,0,0,1,348.50041,648.25979Z"
              transform="translate(529.0948 1075.45352) rotate(179.99738)"
              fill="#2f2e41"
            />
            <path
              d="M346.84652,638.2278a4.49854,4.49854,0,0,1-1.075-3.55859l21.4646-160.98535,53.32861,9.05664,5.69141-3.415L411.53866,632.0696a4.51232,4.51232,0,0,1-4.09619,3.96387l-16.14771,1.3457a4.49918,4.49918,0,0,1-4.86645-4.74219l4.18066-72.74219a.50006.50006,0,0,0-.98193-.16015l-20.68311,76.70019a4.50773,4.50773,0,0,1-4.34472,3.3291h-14.367A4.49845,4.49845,0,0,1,346.84652,638.2278Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#2f2e41"
            />
            <path
              d="M383.77889,484.95241a3.53283,3.53283,0,0,0-4.51611-.18848l-10.66187,8.293a4.49611,4.49611,0,0,1-7.0874-2.30664c-5.22973-18.31543-17.07837-64.418-14.15942-96.86621,1.65454-18.39258,17.53711-32.37109,35.405-31.19824,12.21557.81445,20.252,7.86133,23.886,20.94434,8.92261,32.12207,18.72828,91.04394,20.60328,102.53027a4.48018,4.48018,0,0,1-2.13648,4.58887A32.939,32.939,0,0,1,408.42,495.44655C401.30087,495.44655,392.76473,492.968,383.77889,484.95241Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ccc"
            />
            <path
              d="M387.8018,496.379a10.05578,10.05578,0,0,0-10.9788-10.8269l-14.87184-32.49319-9.84154,15.74731L367.741,497.24808a10.11027,10.11027,0,0,0,20.06081-.86908Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ffb8b8"
            />
            <path
              d="M361.00961,484.81179a4.505,4.505,0,0,1-2.91114-2.2334l-15.65918-28.90918a46.3735,46.3735,0,0,1-4.45434-32.33887l8.17846-36.123a14.49652,14.49652,0,1,1,28.99268.14161l-9.98145,57.89257,8.25367,31.18067a4.51469,4.51469,0,0,1-1.78858,4.85156l-7.02295,4.86133a4.50565,4.50565,0,0,1-2.56372.7998A4.455,4.455,0,0,1,361.00961,484.81179Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ccc"
            />
            <polygon
              points="166.697 173.828 157.697 211.828 170.697 243.828 161.697 212.828 166.697 173.828"
              opacity="0.2"
            />
            <path
              d="M367.16341,349.76393a16.53847,16.53847,0,0,1-6.388-1.15575c-.89411-.34457-1.82226-.62779-2.71471-.97258-7.8817-3.04509-13.07367-11.43907-13.25962-19.8865s4.18867-16.64645,10.68463-22.0498,14.90986-8.17746,23.33495-8.819c9.07522-.691,19.29422,1.61043,24.36535,9.16826,1.34985,2.01177,2.29389,4.45258,1.494,6.8816a4.40341,4.40341,0,0,1-1.24079,1.90593c-2.2647,2.01487-4.52249.49989-6.83116.366-3.17324-.184-6.02338,2.38457-7.04776,5.39355s-.57345,6.32161.25367,9.39068a23.45956,23.45956,0,0,1,1.18249,5.71008,5.74054,5.74054,0,0,1-2.37856,5.05472c-1.98288,1.19858-4.58693.50489-6.571-.69176s-3.69841-2.86047-5.84154-3.74105-5.02244-.68525-6.26984,1.26729a6.93473,6.93473,0,0,0-.79266,2.28861c-1.11828,5.09485-.86126,4.7948-1.97954,9.88965Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#2f2e41"
            />
            <path
              d="M580.11488,433.1146a4.31989,4.31989,0,0,1-.8074-3.70516,102.32847,102.32847,0,0,0-.0003-47.52515,4.321,4.321,0,0,1,.8077-3.70516,4.2478,4.2478,0,0,1,3.35525-1.62564h39.87222a4.30187,4.30187,0,0,1,4.2371,3.6057,167.48733,167.48733,0,0,1,0,50.97535,4.30187,4.30187,0,0,1-4.2371,3.6057H583.47013A4.2478,4.2478,0,0,1,580.11488,433.1146Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#e6e6e6"
            />
            <path
              d="M518.43373,292.49666a4.31845,4.31845,0,0,1-.80709-3.70455,102.33247,102.33247,0,0,0,0-47.52515,4.31848,4.31848,0,0,1,.80709-3.70456,4.24662,4.24662,0,0,1,3.35526-1.62625h39.87252a4.30258,4.30258,0,0,1,4.2371,3.60571,167.48727,167.48727,0,0,1,0,50.97534,4.30258,4.30258,0,0,1-4.2371,3.60571H521.789A4.24659,4.24659,0,0,1,518.43373,292.49666Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#e6e6e6"
            />
            <path
              d="M616.54546,339.53454a167.48663,167.48663,0,0,1,0-50.97534,4.30156,4.30156,0,0,1,4.23679-3.60571h39.87252a4.2466,4.2466,0,0,1,3.35526,1.62625,4.31916,4.31916,0,0,1,.8074,3.70456,102.32847,102.32847,0,0,0-.0003,47.52515,4.318,4.318,0,0,1-.8071,3.70455,4.24657,4.24657,0,0,1-3.35526,1.62625H620.78225A4.30156,4.30156,0,0,1,616.54546,339.53454Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#438f5f"
            />
            <path
              d="M449.62243,337.75466a167.50643,167.50643,0,0,1,0-50.97535,4.30257,4.30257,0,0,1,4.2371-3.6057h39.87252a4.24661,4.24661,0,0,1,3.35526,1.62624,4.31916,4.31916,0,0,1,.80739,3.70456,102.32847,102.32847,0,0,0-.0003,47.52515,4.31805,4.31805,0,0,1-.80709,3.70456,4.24661,4.24661,0,0,1-3.35526,1.62624H453.85953A4.30257,4.30257,0,0,1,449.62243,337.75466Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#ff6584"
            />
            <path
              d="M459.48435,455.42648a4.39086,4.39086,0,0,1-.82066-3.766,104.00128,104.00128,0,0,0-.00031-48.30592,4.392,4.392,0,0,1,.821-3.766,4.31762,4.31762,0,0,1,3.41038-1.65235H503.422a4.37254,4.37254,0,0,1,4.3067,3.66495,170.23814,170.23814,0,0,1,0,51.81279,4.37254,4.37254,0,0,1-4.3067,3.66494H462.89473A4.31762,4.31762,0,0,1,459.48435,455.42648Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#438f5f"
            />
            <path
              d="M219.04862,664.06385h773.294a1.19068,1.19068,0,1,0,0-2.38137h-773.294a1.19069,1.19069,0,1,0,0,2.38137Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#3f3d56"
            />
            <path
              d="M495.60138,419.75793H474.252a3.00328,3.00328,0,0,1-3-3V415.484a3.00328,3.00328,0,0,1,3-3h21.34937a3.00328,3.00328,0,0,1,3,3v1.27392A3.00328,3.00328,0,0,1,495.60138,419.75793Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M495.60138,432.30529H474.252a3.00328,3.00328,0,0,1-3-3v-1.27392a3.00328,3.00328,0,0,1,3-3h21.34937a3.00328,3.00328,0,0,1,3,3v1.27392A3.00328,3.00328,0,0,1,495.60138,432.30529Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M481.462,307.85022H460.53839a3.00328,3.00328,0,0,1-3-3v-1.17188a3.00328,3.00328,0,0,1,3-3H481.462a3.00328,3.00328,0,0,1,3,3v1.17188A3.00328,3.00328,0,0,1,481.462,307.85022Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M615.14142,395.97961H594.21808a3.00328,3.00328,0,0,1-3-3v-1.17236a3.00328,3.00328,0,0,1,3-3h20.92334a3.00328,3.00328,0,0,1,3,3v1.17236A3.00328,3.00328,0,0,1,615.14142,395.97961Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M615.14142,410.79309H594.21808a3.00328,3.00328,0,0,1-3-3v-1.17237a3.00328,3.00328,0,0,1,3-3h20.92334a3.00329,3.00329,0,0,1,3,3v1.17237A3.00329,3.00329,0,0,1,615.14142,410.79309Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M615.14142,425.60656H594.21808a3.00328,3.00328,0,0,1-3-3V421.4342a3.00328,3.00328,0,0,1,3-3h20.92334a3.00328,3.00328,0,0,1,3,3v1.17236A3.00328,3.00328,0,0,1,615.14142,425.60656Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M481.462,320.19494H460.53839a3.00328,3.00328,0,0,1-3-3v-1.17236a3.00328,3.00328,0,0,1,3-3H481.462a3.00328,3.00328,0,0,1,3,3v1.17236A3.00328,3.00328,0,0,1,481.462,320.19494Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M553.639,257.83117H532.71564a3.00328,3.00328,0,0,1-3-3v-1.17236a3.00328,3.00328,0,0,1,3-3H553.639a3.00328,3.00328,0,0,1,3,3v1.17236A3.00328,3.00328,0,0,1,553.639,257.83117Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
            <path
              d="M649.11285,310.86486H628.18927a3.00328,3.00328,0,0,1-3-3V306.6925a3.00328,3.00328,0,0,1,3-3h20.92358a3.00328,3.00328,0,0,1,3,3v1.17236A3.00328,3.00328,0,0,1,649.11285,310.86486Z"
              transform="translate(-206.46668 -235.93615)"
              fill="#fff"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-xl">Create a Project</h1>
      </div>

      {/****  Navbar ****/}
      <nav className="flex justify-center gap-16 py-5 select-none">
        <div className="flex flex-col items-center w-[15px]">
          <button
            className={`${
              page === 1 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center border-[1px] rounded-full w-6 h-6 text-[13px] font-bold hover:bg-blue-500 hover:text-white`}
            onClick={() => {
              setPage(1);
            }}
          >
            1
          </button>
          currentProjectData
          <p className="text-[14px]">Details</p>
        </div>
        <div className="flex flex-col items-center w-[15px] ">
          <button
            className={`${
              page === 2 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center border-[1px] rounded-full w-6 h-6 text-[13px] font-bold hover:bg-blue-500 hover:text-white`}
            onClick={validateFirstPageHandler}
          >
            2
          </button>
          <p className="text-[14px]">Extra</p>
        </div>
      </nav>

      {/* FORMS */}

      {page === 1 ? (
        <div>
          <form className="flex flex-col w-full h-full mt-2 text-[14px] sm:px-[40px]">
            <div className="flex w-full maxsm:flex-col ">
              <div className="flex flex-col w-[50%] maxsm:w-full mr-[16px]">
                <label htmlFor="name">Choose a name</label>
                <input
                  type="text"
                  value={name!}
                  onChange={handleNameChange}
                  onBlur={nameBlurHandler}
                  placeholder="Give your project a name"
                  className={`${
                    isNameError
                      ? "border-[1px] border-red-600 focus:border-red-600"
                      : ""
                  } h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px] `}
                  id="name"
                />
                {isNameError && (
                  <p className="text-red-600 mt-1">Please enter a name</p>
                )}
              </div>

              <div className="flex flex-col w-[50%] maxsm:w-full maxsm:mt-3 sm:ml-[16px]">
                <label htmlFor="client">Choose a Client</label>
                <select
                  className={`${
                    isClientError
                      ? "border-[1px] border-red-600 focus:border-red-600"
                      : ""
                  } h-[38px] w-full py-[5px] px-[12px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500 maxsm:focus:outline-[0px]`}
                  id="client"
                  value={selectedClient}
                  onChange={handleClientChange}
                  onBlur={clientBlurHandler}
                >
                  <option value="default">Select a client</option>
                  {/*! NEED TO FETCH user's clients */}
                  {clients?.map((client: Client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {isClientError && (
                  <p className="text-red-600 mt-1">Please choose a client</p>
                )}
              </div>
            </div>

            <div className="w-full mt-5 rounded-md">
              <textarea
                className="w-full min-h-[130px] 
                max-h-[200px]
                bg-gray-100 px-3 p-2 focus:outline-none focus:border-[1px] focus:border-blue-500  rounded-md maxsm:focus:outline-[0px]"
                placeholder="Add a description"
                value={description!}
                onChange={handleDescriptionChange}
              />
            </div>
          </form>
          <footer className="flex justify-between pt-5 sm:px-[40px] maxxs:pt-[3.5rem] ">
            <button
              className="px-3 py-2 w-[90px]   bg-red-500 text-white rounded-md"
              onClick={() => {
                resetForm();
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2  bg-gray-300 hover:bg-blue-500 hover:text-white rounded-md"
              onClick={validateFirstPageHandler}
            >
              Next Page
            </button>
          </footer>
        </div>
      ) : (
        //*** Second Form ***/
        <div>
          <form
            className="flex flex-col w-full h-full mt-2 mb-2 text-[14px] sm:px-[40px]"
            onSubmit={submitHandler}
          >
            <div className="flex w-full gap-4 mr-[16px] maxxs:flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="name">Priority</label>
                <select
                  value={priority}
                  onChange={handlePriorityChange}
                  className={` h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px] `}
                  id="name"
                >
                  <option value="NONE">None</option>
                  <option value="LOW">Low</option>
                  <option value="MID">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                {isNameError && (
                  <p className="text-red-600 mt-1">Please enter a name</p>
                )}
              </div>

              <div className="flex flex-col w-full ">
                <label htmlFor="name">Hourly Rate</label>
                <input
                  id="name"
                  type="number"
                  value={hourlyRate}
                  max={9999999}
                  onChange={handleHourlyRateChange}
                  className={` h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px] `}
                />
              </div>
            </div>

            <div className="flex gap-4 my-5 maxxs:flex-col">
              <div className="flex flex-col w-[50%] maxxs:w-full">
                <label>Start Date</label>
                <input
                  type="date"
                  onChange={handleStartDateChange}
                  min={new Date().toISOString()}
                  value={startDate + ""}
                  className="h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px]"
                />
              </div>
              <div className="flex flex-col w-[50%] maxxs:w-full">
                <label>Due Date</label>
                <input
                  type="date"
                  onChange={handleEndDateChange}
                  min={startDate + ""}
                  value={dueDate! + ""}
                  className="h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px]"
                />
              </div>
            </div>
            <footer className="flex justify-between sm:pt-5 text-[16px] maxxs:pt-[3.5rem]  ">
              <button
                className="px-3 py-2 w-[90px]  bg-red-500 text-white rounded-md"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <div className="flex gap-3">
                <button
                  className="px-3 py-2  bg-gray-300  hover:bg-blue-500 hover:text-white rounded-md"
                  onClick={() => setPage(1)}
                >
                  Back
                </button>
                <button
                  className="px-3 py-2 bg-blue-500 text-white rounded-md"
                  type="submit"
                >
                  Create Project
                </button>
              </div>
            </footer>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default EditProjectModal;
