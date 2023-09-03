import Xarrow from 'react-xarrows';
import { Contract, Contribution, Party } from '../domain/contracts';
import { useContracts, setContract } from '../infrastructure/contract.repository';

function Parties(contract: Contract) {

  function filterContribution(value: Contribution, index: number, array: Contribution[]): unknown {
    return value.partyId === contract.parties[0].id;
  }

  function contributionMapper(c: Contribution) {
    return `${c.quantity.amount} ${c.quantity.unit}`
  }

  const getLabelStart = (c: Contract) => {
    return `Offers ${c.contributions.filter(filterContribution).map(contributionMapper)}`
  }
  const getLabelEnd = (c: Contribution) => {
    return `of ${c.type}`
  }

  return <div className='flex justify-between'>

    <ContractParty party={contract.parties[0]} />
    <ContractParty party={contract.parties[1]} />

    <Xarrow
      labels={{ start: getLabelStart(contract), end: getLabelEnd(contract.contributions[0]) }}
      start={`h3-${contract.parties[0].id}`} //can be react ref
      end={`a-${contract.parties[1].id}`} //or an id
      startAnchor='right'
      endAnchor='left'
    />
    <Xarrow
      labels={{ start: getLabelStart(contract), end: getLabelEnd(contract.contributions[1]) }}
      start={`h3-${contract.parties[1].id}`} //can be react ref
      end={`a-${contract.parties[0].id}`} //or an id
      startAnchor='left'
      endAnchor='right'
    />

  </div>;

}

const ContractParty = ({ party }: { party: Party }) => {
  console.log("🚀 ~ file: Contracts.tsx:5 ~ ContractItem ~ party:", party)

  return (
    <div id={party.id} className='p-4'>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">

        <div className="p-4 md:p-5">
          <h3 id={`h3-${party.id}`} className="text-lg font-bold text-gray-800 dark:text-white">
            Party - {party.id}
          </h3>

          <p className="mt-2 text-gray-800 dark:text-gray-400">
            <strong className='mr-2'>Name</strong>{party.name}
          </p>
          <p className="mt-2 text-gray-800 dark:text-gray-400">
            <strong className='mr-2'>Birth</strong>{new Date(party.birth).toLocaleDateString('fr')}
          </p>
          <a id={`a-${party.id}`} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700" href="#">
            Details link
            <svg className="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}

const ContractItem = ({ contract }: { contract: Contract }) => {
  console.log("🚀 ~ file: Contracts.tsx:5 ~ ContractItem ~ contract:", contract)
  return (
    <div className='p-4'>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Contract - {contract.id}
          </h3>
        </div>
        <div className="p-4 md:p-5">
          {Parties(contract)}
          <a className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700" href="#">
            Details
            <svg className="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}

const Contracts = () => {
  const [contracts, loading, error] = useContracts();

  return (
    <div>
      <button onClick={() => setContract({
        id: 'contract0',
        createdAt: '2023-08-31T21:19:15.397Z',
        parties: [
          { id: 'A', name: 'name A', birth: '2023-08-10T21:19:15.397Z', type: 'individual' },
          { id: 'B', name: 'name B', birth: '2023-06-22T21:19:15.397Z', type: 'individual' }
        ],
        contributions: [
          {
            partyId: 'A',
            toPartyId: 'B',
            type: "Cours d'anglais",
            quantity: { amount: 1, unit: 'hour' },
            value: { amount: 20, unit: 'mini credits' }
          },
          {
            partyId: 'B',
            toPartyId: 'A',
            type: 'Cours de 3D - blender enfant -12ans',
            quantity: { amount: 1, unit: 'hour' },
            value: { amount: 20, unit: 'mini credits' }
          }
        ]
      })}>
        Add Contract
      </button>
      <div>
        {error && <strong>Error: {error.message}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && contracts && (
          <>
            {contracts.map((contract) => (
              <ContractItem key={contract.id} contract={contract} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export { Contracts }


