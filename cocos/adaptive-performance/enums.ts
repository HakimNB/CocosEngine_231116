export enum  PriorityLevel{
    HIGH = 1,
    MIDDLE =5,
    LOW = 10,
}

export enum ThermalLevel {
    NoWarning,
    WarningLevel1,
    WarningLevel2,
    Critical
}

export enum PerformanceLevel {
    POWER_SAVE,
    LOW_PERFORMANCE,
    MEDIUM_PERFORMANCE,
    HIGH_PERFORMANCE,
    BOOST,
}

export enum BottleneckType {
    NONE = 0,
    CPU = 1,
    GPU = 2,
    ALL = GPU | CPU,
}
