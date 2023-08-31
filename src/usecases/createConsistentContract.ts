import { Contract, createContract, defaultContributions, defaultParties } from "../domain/contracts";

/**
 * A contract should have:
 * - at least two parties
 * - each party should provide at least one contribution
 * 
 * @param properties (0 up to all Contract properties)
 * @returns Contract
 */
const createConsistentContract = (properties: Partial<Contract>) => {
    const contract = createContract(properties);

    // TODO: check if contract exists in database

    // at least two parties
    if (contract.parties.length < 2) {
        throw new Error('A contract should have at least two parties');
    }

    // each party should provide at least one contribution
    contract.parties.forEach(party => {
        if (contract.contributions.filter(c => c.partyId === party.id).length === 0) {
            throw new Error(`Party ${party.id} should provide at least one contribution`);
        }
    });
    return contract;
}

export { createConsistentContract };