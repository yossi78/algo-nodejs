
class CallBackExample {
    private countryMap: Record<string, string> = {
        "IL": "Israel",
        "USA": "United States",
        "FR": "France"
    };

    public getJsonData(callBack: (data: Record<string, string>) => void): void {
        callBack(this.countryMap);
    }

    public getShortCountries(): Promise<string[]> {
        return new Promise((resolve) => {
            this.getJsonData((data) => {
                resolve(Object.keys(data));
            });
        });
    }
}

async function main() {
    const example = new CallBackExample();
    const shortCountries = await example.getShortCountries();
    console.log("Country shortcuts:", shortCountries);
}

main();