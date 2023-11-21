export function getMockData() {
    return {
        users: {
            "1": { id: "1" },
            "2": { id: "2" },
            "4": { id: "4" }
        },
        directory: {
            "1": ["123", "234"],
            "4": ["234", "345"],
        },
        numberOccurrences: {
            "123": 1,
            "234": 2,
            "345": 1
        }
    }
}