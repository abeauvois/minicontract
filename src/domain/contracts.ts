type DateTimeAsISOString = string;

type ContributionType = "Cours d'anglais" | "Cours de 3D - blender enfant -12ans";
type ContributionUnit = 'euro cents' | 'mini cents';

type PartyType = 'individual' | 'organization' | 'child';

type TimeUnit = 'hour' | 'day' | 'week' | 'month' | 'year';
type MassUnit = 'gram' | 'kilogram';
type VolumeUnit = 'milliliter' | 'liter';
type PriceUnit = 'euro cents' | 'mini credits';

type Periodicity = {
    every: number;
    timeUnit: TimeUnit;
};

type ValueUnit = PriceUnit;
type Value = {
    amount: number;
    unit: ValueUnit;
};

type QuantityUnit = TimeUnit | MassUnit | VolumeUnit;
type Quantity = {
    amount: number;
    unit: QuantityUnit;
};

type Contribution = {
    partyId: string;
    toPartyId: string;
    type: ContributionType;
    quantity: Quantity;
    value: Value;
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
    // periodicity: ContributionPeriodicity;
    startAt?: DateTimeAsISOString;
    endAt?: DateTimeAsISOString;
};

const defaultParties: Party[] = [{
    id: 'A',
    name: '',
    birth: '23/07/2000',
    type: 'individual',
},
{
    id: 'B',
    name: '',
    birth: '23/07/2000',
    type: 'individual'
}];

const defaultContributions: Contribution[] = [{
    partyId: 'A',
    toPartyId: 'B',
    type: "Cours d'anglais",
    quantity: {
        amount: 1,
        unit: "hour",
    },
    value: {
        amount: 20 * 100,
        unit: 'euro cents',
    },
},
{
    partyId: 'B',
    toPartyId: 'A',
    type: "Cours de 3D - blender enfant -12ans",
    quantity: {
        amount: 1,
        unit: "hour",
    },
    value: {
        amount: 20 * 100,
        unit: 'euro cents',
    },
}
];

// const defaultPeriodicity: ContributionPeriodicity = 'monthly';

const defaultContract: Contract = {
    createdAt: new Date().toISOString(),
    parties: defaultParties,
    contributions: defaultContributions,
    // periodicity: defaultPeriodicity
};

const createContract = (properties: Partial<Contract>) => {
    if (!properties) { return defaultContract; }
    const contract: Contract = {
        ...defaultContract,
        ...properties,
    };

    return contract;
}

export { createContract, defaultContract, defaultParties, defaultContributions };

export type { Contract, Contribution, Party };