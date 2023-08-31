import { Contract, createContract, defaultContribution, defaultParty } from "../domain/contracts";

/**
 * A contract should have:
 * - at least one party
 * - at least one contribution
 * - each party should provide at least one contribution
 * 
 * @param properties (0 up to all Contract properties)
 * @returns Contract
 */
const createConsistentContract = (properties: Partial<Contract>) => {
    const contract = createContract(properties);

    // at least one party
    if (contract.parties.length === 0) {
        contract.parties = [defaultParty];
    }

    // at least one contribution    
    if (contract.contributions.length === 0) {
        contract.contributions = [defaultContribution];
    }

    // each party should provide at least one contribution
    contract.parties.forEach(party => {
        if (contract.contributions.filter(c => c.partyId === party.id).length === 0) {
            contract.contributions.push(defaultContribution);
        }
    });
    return contract;
}

export { createConsistentContract };