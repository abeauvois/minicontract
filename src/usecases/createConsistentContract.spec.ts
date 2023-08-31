import { defaultParty, defaultContribution, Contract } from "../domain/contracts";  // Adjust the import based on your file structure
import { createConsistentContract } from "./createConsistentContract";

describe('createConsistentContract', () => {

    test('should return contract with at least one party', () => {
        const contract = createConsistentContract({});
        expect(contract.parties.length).toBeGreaterThanOrEqual(1);
    });

    test('should return contract with at least one contribution', () => {
        const contract = createConsistentContract({});
        expect(contract.contributions.length).toBeGreaterThanOrEqual(1);
    });

    test('each party should provide at least one contribution', () => {
        const contract = createConsistentContract({
            parties: [defaultParty, defaultParty]
        });

        contract.parties.forEach(party => {
            const contributionsByParty = contract.contributions.filter(c => c.partyId === party.id);
            expect(contributionsByParty.length).toBeGreaterThanOrEqual(1);
        });
    });

});
