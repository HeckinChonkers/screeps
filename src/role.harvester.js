var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            
            if(creep.memory.targetSourceId != source.id){
                if(Memory.sources[creep.memory.targetSourceId] != undefined && Memory.sources[creep.memory.targetSourceId] != null){
                    if(Memory.sources[creep.memory.targetSourceId] != 0){
                        Memory.sources[creep.memory.targetSourceId]--;
                    }
                }
                creep.memory.targetSourceId = source.id;
                Memory.sources[creep.memory.targetSourceId] += 1;
            }
     
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleHarvester;