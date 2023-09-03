import { Contract, defaultContributions, defaultParties } from "../domain/contracts";  // Adjust the import based on your file structure
import { createConsistentContract } from "./createConsistentContract";


describe('createConsistentContract', () => {

    test('should throw error if less than two parties', () => {
        expect(() => createConsistentContract({ parties: [defaultParties[0]] })).toThrow('A contract should have at least two parties');
    });

    test('each party should provide at least one contribution', () => {
        const contract: Contract = {
            id: 'contract0',
            createdAt: new Date().toISOString(),
            parties: [defaultParties[0], defaultParties[1]],
            contributions: [defaultContributions[0]]
        };
        expect(() => createConsistentContract(contract)).toThrow(/Party B should provide at least one contribution/);
    });

});
