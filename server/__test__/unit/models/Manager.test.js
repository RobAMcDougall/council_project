const Managers = require("../../../Models/Manager")
const Project = require("../../../Models/Manager")
const db = require("../../../Database/connect")
describe('Manager', () =>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    describe('organisationInfo', () => {
        it('resolves with the organization info', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ organizationid: 1, description: 'xxxx', organizationname: 'xxxx' }] });
            const info = await Managers.organizationInfo();
    
            expect(info).toBeDefined();
            expect(info).toHaveProperty('description');
            expect(info).toHaveProperty('name');
            expect(typeof info.name).toBe('string');
        });


        it('throws an error on db query', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            try{
                await Managers.organizationInfo();
            }catch(error){
                expect(error).toBeDefined();
                expect(error.message).toBe("can not get Organization")
            }   
        })
    })
    describe('getByName', () => {
        it('resolves with the project info with a specific name', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, description: 'xxxx', name: 'xxxx' }] });
            const info = await Project.getByName();
    
            expect(info).toBeDefined();
            expect(info).toHaveProperty('description');
        });


        it('throws an error on db query', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            try{
                await Managers.organizationInfo();
            }catch(error){
                expect(error).toBeDefined();
                expect(error.message).toBe("can not get Organization")
            }   
        })
    })
    describe('getByType', ()=>{
        it('resolves with th project details', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[{id:1 ,name:"fff" ,description:"fff" ,day:"ffff" ,date:"2024-02-25" ,time:"12:50:00" ,organizationid:"ffff",organizationname:"fff"}]}) 
            
            const name = await Project.getByType()
            
            expect(name).toBeDefined();
            expect(name.id).toBe(1);
            expect(name).toHaveProperty('id');
            expect(name).toHaveProperty('name');
            expect(name).toHaveProperty('description');
            expect(name).toHaveProperty('day');
            expect(name).toHaveProperty('date');
            expect(name).toHaveProperty('time');
            expect(name).toHaveProperty('organizationid');
            expect(name).toHaveProperty('organizationname');

        })
    })
})