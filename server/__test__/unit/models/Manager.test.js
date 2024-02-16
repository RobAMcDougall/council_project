const Managers = require("../../../Models/Manager")
const Project = require("../../../Models/Manager")
const db = require("../../../Database/connect")
describe('Manager', 'Project', () =>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    describe('organisationInfo', () => {
        it('resolves with the organization info', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ organizationid: 1, description: 'xxxx', organizationname: 'xxxx' }] });
            const info = await Managers.organizationInfo();
    
            expect(info).toBeDefined();
            expect(info).toBeInstanceOf(Managers)
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
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, description: 'red', name: 'Dave', type:'Outdoors', date:'2024-12-07', time: '18:00:00', day:'Monday', organizationid:"ffff", organizationname:"fff" }]});
            const info = await Project.getByName('Dave');
    
            expect(info).toBeDefined();
            expect(info.name).toBe('Dave');
            expect(info).toBeInstanceOf(Project);
            expect(info).toHaveProperty('id');
            expect(info).toHaveProperty('name');
            expect(info).toHaveProperty('type');
            expect(info).toHaveProperty('description');
            expect(info).toHaveProperty('day');
            expect(info).toHaveProperty('date');
            expect(info).toHaveProperty('time');
            expect(info).toHaveProperty('organizationid');
            expect(info).toHaveProperty('organizationname');
        });


        it('throws an error on db query', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            try{
                await Project.getByName('Dave');
            }catch(error){
                expect(error).toBeDefined();
                expect(error.message).toBe("No activities Found in Database")
            }   
        });
    })
    describe('getByType', ()=>{
        it('resolves with the project details by type', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, description: 'red', name: 'Dave', type:'Outdoors', date:'2024-12-07', time: '18:00:00', day:'Monday', organizationid:"ffff", organizationname:"fff" }]});
            
            const info = await Project.getByType()
            
            expect(info).toBeDefined();
            expect(info.type).toBe('Outdoors'); 
            expect(info).toBeInstanceOf(Project);
            expect(info).toHaveProperty('id');
            expect(info).toHaveProperty('name');
            expect(info).toHaveProperty('type');
            expect(info).toHaveProperty('description');
            expect(info).toHaveProperty('day');
            expect(info).toHaveProperty('date');
            expect(info).toHaveProperty('time');
            expect(info).toHaveProperty('organizationid');
            expect(info).toHaveProperty('organizationname');

        });

        it('throws an error on db query', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            try{
                await Project.getByType();
            }catch(error){
                expect(error).toBeDefined();
                expect(error.message).toBe("No activities Found in Database")
            }   
        })
    })
    describe('getByDate', () => {
        it ('resolves with the project details by date', async () => {
            jest.spyOn(db, 'query'),mockResolvedValueOnce({rows: [{id: 1, description: 'red', name: 'Dave', type:'Outdoors', date:'2024-12-07', time: '18:00:00', day:'Monday', organizationid:"ffff", organizationname:"fff"}]})

            const data = await Project.getByDate()

            expect(data).toBeDefined();
            expect(data.date).toBe('2024-02-25');
            expect(data).toHaveProperty('id');
            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('type');
            expect(data).toHaveProperty('description');
            expect(data).toHaveProperty('day');
            expect(data).toHaveProperty('date');
            expect(data).toHaveProperty('time');
            expect(data).toHaveProperty('organizationid');
            expect(data).toHaveProperty('organizationname');
        })
        it('throws an error on db query', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            try{
                await Project.getByDate('2020-20-20');
            }catch(error){
                expect(error).toBeDefined();
                expect(error.message).toBe("No activities found in the database for the given date")
            }   
        })
    })
    describe('getById', () => {
        it ('resolves with the project details by id', async ()=>{
            jest.spyOn(db, 'query'),mockResolvedValueOnce({rows: [{id: 1, description: 'red', name: 'Dave', type:'Outdoors', date:'2024-12-07', time: '18:00:00', day:'Monday', organizationid:"ffff", organizationname:"fff"}]})

            const data = await Project.getById(1)

            expect(data).toBeDefined();
            expect(data.id).toBe(1);
            expect(data).toHaveProperty('id');
            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('type');
            expect(data).toHaveProperty('description');
            expect(data).toHaveProperty('day');
            expect(data).toHaveProperty('date');
            expect(data).toHaveProperty('time');
            expect(data).toHaveProperty('organizationid');
            expect(data).toHaveProperty('organizationname');
        })
        it('throws an error on db query', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            try{
                await Project.getByType(1);
            }catch(error){
                expect(error).toBeDefined();
                expect(error.message).toBe("No Project Found With This Id in the Database")
            }   
        })
    })
    describe('create', () => {
        it('resolves with project on successful db query', async () => {
            let projectData = {description: 'red', name: 'Dave', type:'Outdoors', date:'2024-12-07', time: '18:00:00', day:'Monday', organizationid:"ffff", organizationname:"fff"}

            jest.spyOn(db, 'query').
            mockResolvedValueOnce({rows: [{...projectData, id: 1}]})
            
            const project = await Project.create();
            
            expect(project).toBeTruthy();
            expect(project.name).toBe('Dave')
            expect(project.description).toBe('red')
            expect(project.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
            try {
                await Project.create({name: 'Delilah'});
            } catch (err) {
                expect(err).toBeTruthy();
                expect(err.message).toBe('description is missing')
            }
        })
    })
    describe('destroy', () => {
        it('should return the deleted project', async () => {
        
             const project = new Project({})
             jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1, description: 'red', name: 'Dave', type:'Outdoors', date:'2024-12-07', time: '18:00:00', day:'Monday', organizationid:"ffff", organizationname:"fff" }] })
         
             const result = await project.destroy()
             
         
             expect(result).toBeInstanceOf(Project)
             expect(result.id).toBe(1)
             expect(result).not.toEqual(project)
           })
       
         it('should throw an error if we cannot locate the project', async () => {
             jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
 
             try {
                const project = new Project({name: "test", age: 22})
                await project.destroy()
             }
             catch(err) {
                 expect(err).toBeTruthy();
                 expect(err.message).toBe('Cannot delete')
             }
         })
    })
})