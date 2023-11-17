export interface AppSettings{
    unit: "metric" | "imperical" | "standard",
}

const DefaultSettings: AppSettings = { unit: "metric" }

export default DefaultSettings;