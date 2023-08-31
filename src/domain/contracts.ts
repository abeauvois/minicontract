type DateTimeAsISOString = string;

type ContributionType = "Cours d'anglais" | 'Cours numérique';
type ContributionPeriodicity = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
type ContributionUnit = 'euro cents' | 'mini cents';

type PartyType = 'individual' | 'organization' | 'child';

type Contribution = {
    partyId: string;
    toPartyId: string;
    type: ContributionType;
    amount: string;
    unit: ContributionUnit;
};

type Party = {
    id: string;
    name: string;
    birth: DateTimeAsISOString;
    type: PartyType;
};

type Contract = {
    createdAt: DateTimeAsISOString;
    parties: Party[];
    contributions: Contribution[];
    periodicity: ContributionPeriodicity;
};

const defaultParty: Party = {
    id: '',
    name: '',
    birth: '',
    type: 'individual',
};

const defaultContribution: Contribution = {
    partyId: '',
    toPartyId: '',
    type: "Cours d'anglais",
    amount: '0',
    unit: 'euro cents',
};

const defaultPeriodicity: ContributionPeriodicity = 'monthly';

const defaultContract: Contract = {
    createdAt: new Date().toISOString(),
    parties: [defaultParty],
    contributions: [defaultContribution],
    periodicity: defaultPeriodicity
};

const createContract = (properties: Partial<Contract>) => {
    if (!properties) { return defaultContract; }
    const contract: Contract = {
        ...defaultContract,
        ...properties,
    };

    return contract;
}

export { createContract, defaultContract, defaultParty, defaultContribution, defaultPeriodicity };

export type { Contract, Contribution, Party };