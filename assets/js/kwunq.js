// 电站场景，清洁方式，污渍
const turntableTags = ['situation', 'cleanway', 'stain']
const situationTags = ["ciRoofingTiling", "ciRoofingManualAccess", "ciRoofingBypass", "houseRoof", "ground", "floating", "pool", "farmland", "mountain"]
const cleanwayTags = ["rinseWithWater", "raining", "sprayer", "laborSpraying", "dryBrush"]
const stainTags = ["flyAsh", "dust", "guano", "oilPollution", "leadAshes", "slurry", "rust", "paint"]

/* const modelList = {
    B30M: initModel('B30M', 'Kwun B30M', 600, 148000, 36000),
    B30M2: initModel('B30M2', 'Kwun B30M2', 600, 148000, 36000),
    B30L: initModel('B30L', 'Kwun B30L', 600, 112000, 27600),
    B30L2: initModel('B30L2', 'Kwun B30L2', 600, 112000, 27600),
    B20L: initModel('B20L', 'Kwun B20L', 400, 78400, 20300),
    B20L2: initModel('B20L2', 'Kwun B20L2', 400, 78400, 20300),
    B10L: initModel('B10L', 'Kwun B10L', 200, 54800, 14500),
    B10L2: initModel('B10L2', 'Kwun B10L2', 200, 54800, 14500),
} */
const modelList = {
    B30M: initModel('B30M', 'Kwun B30M', 600, 185000, 45000),
    B30M2: initModel('B30M2', 'Kwun B30M2', 600, 185000, 45000),
    B30L: initModel('B30L', 'Kwun B30L', 600, 140000, 34500),
    B30L2: initModel('B30L2', 'Kwun B30L2', 600, 140000, 34500),
    B20L: initModel('B20L', 'Kwun B20L', 400, 98000, 25500),
    B20L2: initModel('B20L2', 'Kwun B20L2', 400, 98000, 25500),
    B10L: initModel('B10L', 'Kwun B10L', 200, 69000, 18500),
    B10L2: initModel('B10L2', 'Kwun B10L2', 200, 69000, 18500),
}

// 场景效率
const efficiencyRatioMap = {
    B30M: initSituationEfficiencyRatioMap(82, 51, 78, 0, 30, 35, 38, 75, 72),
    B30M2: initSituationEfficiencyRatioMap(85, 53, 80, 0, 33, 37, 39, 76, 74),
    B30L: initSituationEfficiencyRatioMap(81, 54, 75, 0, 34, 38, 40, 74, 73),
    B30L2: initSituationEfficiencyRatioMap(84, 55, 79, 0, 35, 40, 41, 75, 75),
    B20L: initSituationEfficiencyRatioMap(80, 58, 81, 75, 40, 44, 48, 0, 75),
    B20L2: initSituationEfficiencyRatioMap(81, 59, 83, 76, 41, 45, 50, 0, 75),
    B10L: initSituationEfficiencyRatioMap(79, 61, 70, 81, 60, 65, 66, 0, 77),
    B10L2: initSituationEfficiencyRatioMap(81, 63, 72, 83, 61, 66, 67, 0, 78)
}

const fixedVars = {
    // 电站容量（MW）转为电站面积（㎡）的参考比值
    pvPanelAreaRatio: 5400,
    // 堒每天的工作时长
    workHoursDaily: 8,
    // 车辆使用寿命，5年
    vehicleMonthlyLife: 60,
    // 堒使用寿命，6年
    kwunMonthlyLife: 72
}


// 不同清洁方式，在不同站点场景下的人堒配比。表示一人可以管理的堒数量，为0时，表示不支持该模式
const robotRatioPerPerson = {
    rinseWithWater: initManMachineRatio(2, 2, 2, 1, 1, 1, 1, 2, 2),
    laborSpraying: initManMachineRatio(4, 2, 2, 2, 2, 3, 2, 5, 2),
    sprayer: initManMachineRatio(12, 0, 0, 3, 0, 0, 0, 0, 0),
    raining: initManMachineRatio(12, 0, 12, 3, 4, 4, 4, 6, 6),
    dryBrush: initManMachineRatio(12, 4, 12, 3, 4, 4, 4, 6, 6)
}

const cleanCycleMap = {
    flyAsh: 1,
    dust: 1,
    guano: 1,
    oilPollution: 2,
    leadAshes: 3,
    slurry: 3,
    rust: 3,
    paint: 4
}

const currencyMap = {
    zh: '¥',
    en: '$'
}

const costByCountryMap = {
    zh: {
        // 车辆
        vehiclePrice: 60000,
        vehicleQuantity: 1,
        // 固定成本（每月）
        personBasicSalary: 5000,
        personManagementExpense: 200,
        vehicleMaintenanceCost: 800,
        kwunMaintenanceCost: 250,
        // 浮动成本（每日）
        personSubsidy: 250,
        vehicleTravelCost: 400,
        fuelConsumption: 100
    },
    en: {
        // 车辆
        vehiclePrice: 10000,
        vehicleQuantity: 1,
        // 固定成本（每月）
        personBasicSalary: 2500,
        personManagementExpense: 500,
        vehicleMaintenanceCost: 350,
        kwunMaintenanceCost: 150,
        // 浮动成本（每日）
        personSubsidy: 200,
        vehicleTravelCost: 100,
        fuelConsumption: 20
    }
}

/**
 * 人堒配比，一人管理的堒的数量，为 0 时，表示不支持该模式
 * @param {*} ciRoofingTilingRatio
 * @param {*} ciRoofingManualAccessRatio
 * @param {*} ciRoofingBypassRatio
 * @param {*} houseRoofRatio
 * @param {*} poolRatio
 * @param {*} farmlandRatio
 * @param {*} mountainRatio
 * @param {*} floatingRatio
 * @param {*} groundRatio
 */
function initManMachineRatio(ciRoofingTilingRatio, ciRoofingManualAccessRatio, ciRoofingBypassRatio,
    houseRoofRatio, poolRatio, farmlandRatio, mountainRatio, floatingRatio, groundRatio) {
    return {
        ciRoofingTiling: ciRoofingTilingRatio,
        ciRoofingManualAccess: ciRoofingManualAccessRatio,
        ciRoofingBypass: ciRoofingBypassRatio,
        houseRoof: houseRoofRatio,
        pool: poolRatio,
        farmland: farmlandRatio,
        mountain: mountainRatio,
        floating: floatingRatio,
        ground: groundRatio,
    }
}

/**
 * 型号的基本信息
 *
 * @param {*} model
 * @param {*} alias
 * @param {*} nominalEfficiency
 * @param {*} rmb
 * @param {*} dollar
 * @returns
 */
function initModel(model, alias, nominalEfficiency, rmb, dollar) {
    if (!alias) {
        alias = model
    }
    return {
        model,
        alias,
        nominalEfficiency,
        price: {
            rmb, dollar
        }
    }
}

/**
 * 场景效率比例值，为0时，表示不支持该场景
 * @param {Number} ciRoofingTilingRatio
 * @param {Number} ciRoofingManualAccessRatio
 * @param {Number} ciRoofingBypassRatio
 * @param {Number} houseRoofRatio
 * @param {Number} poolRatio
 * @param {Number} farmlandRatio
 * @param {Number} mountainRatio
 * @param {Number} floatingRatio
 * @param {Number} groundRatio
 */
function initSituationEfficiencyRatioMap(ciRoofingTilingRatio, ciRoofingManualAccessRatio, ciRoofingBypassRatio,
    houseRoofRatio, poolRatio, farmlandRatio, mountainRatio, floatingRatio, groundRatio) {
    return {
        ciRoofingTiling: ciRoofingTilingRatio,
        ciRoofingManualAccess: ciRoofingManualAccessRatio,
        ciRoofingBypass: ciRoofingBypassRatio,
        houseRoof: houseRoofRatio,
        pool: poolRatio,
        farmland: farmlandRatio,
        mountain: mountainRatio,
        floating: floatingRatio,
        ground: groundRatio,
    }
}

function resetActualCleaningEfficiency(kwunChoose) {
    // 重新计算单台堒的每天清洁效率
    let actualCEOfMachine = ''
    if (kwunChoose.nominalEfficiency
        && kwunChoose.situationEfficiencyRatio
        && kwunChoose.cleanCycle
    ) {
        actualCEOfMachine = kwunChoose.nominalEfficiency * kwunChoose.situationEfficiencyRatio * fixedVars.workHoursDaily / kwunChoose.cleanCycle / 100
    }
    kwunChoose.actualCEOfMachine = Math.round(actualCEOfMachine)


    // 重新计算单个团队的每天清洁效率
    let actualCEOfTeam = ''
    if (actualCEOfMachine && kwunChoose.kwunQuantity) {
        actualCEOfTeam = actualCEOfMachine * kwunChoose.kwunQuantity
    }
    kwunChoose.actualCEOfTeam = actualCEOfTeam
}

function resetWorkDays(kwunChoose) {
    if (kwunChoose.stationArea
        && kwunChoose.cleanCycle
        && kwunChoose.kwunQuantity
        && kwunChoose.nominalEfficiency
        && kwunChoose.situationEfficiencyRatio
    ) {
        const actualCEOfMachine = kwunChoose.nominalEfficiency * kwunChoose.situationEfficiencyRatio * fixedVars.workHoursDaily / kwunChoose.cleanCycle / 100
        let workDays = 0
        if (actualCEOfMachine) {
            workDays = kwunChoose.stationArea / actualCEOfMachine / kwunChoose.kwunQuantity
        }
        // 天数保留1位小数，更多的小数位数没有意义
        // workDays = Math.round(workDays * 10) / 10
        // workDays = Math.ceil(workDays)
        kwunChoose.workDays = workDays
    } else {
        kwunChoose.workDays = ''
    }
}

function calCost(kwunChoose) {
    // 清洁天数
    const workDays = kwunChoose.workDays || 0

    // 人工成本
    const personQuantity = kwunChoose.personQuantity || 0

    const personBasicSalary = kwunChoose.personBasicSalary || 0
    const personManagementExpense = kwunChoose.personManagementExpense || 0

    // 车辆成本
    const vehiclePrice = kwunChoose.vehiclePrice || 0
    const vehicleQuantity = kwunChoose.vehicleQuantity || 0

    // 车辆折旧
    const vehicleMonthlyDepreciationCost = vehiclePrice / fixedVars.vehicleMonthlyLife
    kwunChoose.vehicleMonthlyDepreciationCost = vehicleMonthlyDepreciationCost

    const vehicleMaintenanceCost = kwunChoose.vehicleMaintenanceCost || 0

    // 堒成本
    const kwunPrice = kwunChoose.price || 0
    const kwunQuantity = kwunChoose.kwunQuantity || 0
    // 堒折旧
    const kwunMonthlyDepreciationCost = kwunPrice / fixedVars.kwunMonthlyLife
    kwunChoose.kwunMonthlyDepreciationCost = kwunMonthlyDepreciationCost
    const kwunMaintenanceCost = kwunChoose.kwunMaintenanceCost || 0

    const totalKwunPrice = kwunPrice * kwunQuantity
    const totalInvestment = totalKwunPrice + vehiclePrice * vehicleQuantity

    // 计算固定资产
    kwunChoose.totalKwunPrice = totalKwunPrice
    kwunChoose.totalInvestment = totalInvestment



    // 按月计算固定成本
    const fixedCostMonthly = (personBasicSalary + personManagementExpense) * personQuantity
        + (vehicleMonthlyDepreciationCost + (vehicleMonthlyDepreciationCost === 0 ? 0 : vehicleMaintenanceCost)) * vehicleQuantity
        + (kwunMonthlyDepreciationCost + (kwunMonthlyDepreciationCost === 0 ? 0 : kwunMaintenanceCost)) * kwunQuantity
    // 项目总固定成本
    const fixedCostWorkday = fixedCostMonthly * workDays / 30
    // 固定成本不可能为 0
    kwunChoose.fixedCostMonthly = fixedCostMonthly || ''
    kwunChoose.fixedCostWorkday = fixedCostWorkday || ''

    // 浮动成本
    const personSubsidy = kwunChoose.personSubsidy || 0
    const vehicleTravelCost = kwunChoose.vehicleTravelCost || 0
    const fuelConsumption = kwunChoose.fuelConsumption || 0
    // 项目浮动成本
    const variableCostWorkday = (personSubsidy * personQuantity + vehicleTravelCost * vehicleQuantity + fuelConsumption) * workDays

    kwunChoose.variableCostWorkday = workDays ? variableCostWorkday : ''

    // 项目总成本
    const totalCostWorkday = fixedCostMonthly && variableCostWorkday ? (fixedCostWorkday + variableCostWorkday) : 0
    kwunChoose.totalCostWorkday = workDays && totalCostWorkday ? totalCostWorkday : ''

    // 按月总成本
    const totalCostMonthly = (kwunPrice && kwunQuantity) ? (fixedCostMonthly + variableCostWorkday) : 0
    kwunChoose.totalCostMonthly = workDays && totalCostMonthly ? totalCostMonthly : ''


    const stationCapacity = kwunChoose.stationCapacity || 0
    const stationArea = kwunChoose.stationArea || 0

    if (kwunChoose.purpose === 1) {
        // 按月计算成本
        if (workDays && totalCostMonthly && stationCapacity && stationArea) {
            const costByMW = Math.ceil(totalCostMonthly / stationCapacity * 100) / 100
            const costPerSquare = Math.ceil(totalCostMonthly / stationArea * 100) / 100
            kwunChoose.costByMW = costByMW || ''
            kwunChoose.costPerSquare = costPerSquare || ''
        } else {
            kwunChoose.costByMW = ''
            kwunChoose.costPerSquare = ''
        }
    } else {
        // 按项目计算成本
        // eslint-disable-next-line no-lonely-if
        if (workDays && totalCostWorkday && stationCapacity && stationArea) {
            const costByMW = Math.ceil(totalCostWorkday / stationCapacity * 100) / 100
            const costPerSquare = Math.ceil(totalCostWorkday / stationArea * 100) / 100
            kwunChoose.costByMW = costByMW || ''
            kwunChoose.costPerSquare = costPerSquare || ''
        } else {
            kwunChoose.costByMW = ''
            kwunChoose.costPerSquare = ''
        }
    }
    // console.error(JSON.parse(JSON.stringify(kwunChoose)))
    return kwunChoose
}

export default {
    turntableTags, situationTags, cleanwayTags, stainTags, fixedVars, modelList,
    efficiencyRatioMap, robotRatioPerPerson, cleanCycleMap, currencyMap, costByCountryMap,
    resetWorkDays, resetActualCleaningEfficiency, calCost
}
