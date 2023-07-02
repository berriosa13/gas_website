
class SelectOptionsService {
  getCarMakeOptions = () => {
    return [
      { value: "none", label: "Select Make..." },
      { value: "Abarth", label: "Abarth" },
      { value: "AC", label: "AC" },
      { value: "Acura", label: "Acura" },
      { value: "AIXAM", label: "AIXAM" },
      { value: "Alfa Romeo", label: "Alfa Romeo" },
      { value: "Alpine", label: "Alpine" },
      { value: "Arash", label: "Arash" },
      { value: "Ariel", label: "Ariel" },
      { value: "Artega", label: "Artega" },
      { value: "Ascari", label: "Ascari" },
      { value: "Aston Martin", label: "Aston Martin" },
      { value: "Audi", label: "Audi" },
      { value: "AvtoVAZ", label: "AvtoVAZ" },
      { value: "BAIC", label: "BAIC" },
      { value: "Bentley", label: "Bentley" },
      { value: "BMW", label: "BMW" },
      { value: "Borgward", label: "Borgward" },
      { value: "Brilliance", label: "Brilliance" },
      { value: "Bristol", label: "Bristol" },
      { value: "Bufori", label: "Bufori" },
      { value: "Bugatti", label: "Bugatti" },
      { value: "Buick", label: "Buick" },
      { value: "Byton", label: "Byton" },
      { value: "Cadillac", label: "Cadillac" },
      { value: "Caterham", label: "Caterham" },
      { value: "Changan", label: "Changan" },
      { value: "Changhe", label: "Changhe" },
      { value: "Chery", label: "Chery" },
      { value: "Chevrolet", label: "Chevrolet" },
      { value: "Chrysler", label: "Chrysler" },
      { value: "Citroen", label: "Citroen" },
      { value: "Coda", label: "Coda" },
      { value: "CT&T", label: "CT&T" },
      { value: "Dacia", label: "Dacia" },
      { value: "Daewoo", label: "Daewoo" },
      { value: "DAF", label: "DAF" },
      { value: "Daihatsu", label: "Daihatsu" },
      { value: "Datsun", label: "Datsun" },
      { value: "Dodge", label: "Dodge" },
      { value: "Donkervoort", label: "Donkervoort" },
      { value: "DS", label: "DS" },
      { value: "Ferrari", label: "Ferrari" },
      { value: "Fiat", label: "Fiat" },
      { value: "Fisker", label: "Fisker" },
      { value: "Force Motors", label: "Force Motors" },
      { value: "Ford", label: "Ford" },
      { value: "Foton", label: "Foton" },
      { value: "GAZ", label: "GAZ" },
      { value: "Geely", label: "Geely" },
      { value: "Genesis", label: "Genesis" },
      { value: "Ginetta", label: "Ginetta" },
      { value: "GMC", label: "GMC" },
      { value: "Great Wall", label: "Great Wall" },
      { value: "Haima", label: "Haima" },
      { value: "Hino", label: "Hino" },
      { value: "Holden", label: "Holden" },
      { value: "Honda", label: "Honda" },
      { value: "Hyundai", label: "Hyundai" },
      { value: "Iconic", label: "Iconic" },
      { value: "Infiniti", label: "Infiniti" },
      { value: "Isuzu", label: "Isuzu" },
      { value: "JAC", label: "JAC" },
      { value: "Jaguar", label: "Jaguar" },
      { value: "Jeep", label: "Jeep" },
      { value: "JMC", label: "JMC" },
      { value: "Kia", label: "Kia" },
      { value: "Koenigsegg", label: "Koenigsegg" },
      { value: "Lamborghini", label: "Lamborghini" },
      { value: "Lancia", label: "Lancia" },
      { value: "Land Rover", label: "Land Rover" },
      { value: "Landwind", label: "Landwind" },
      { value: "Lexus", label: "Lexus" },
      { value: "Lifan", label: "Lifan" },
      { value: "Lincoln", label: "Lincoln" },
      { value: "Lotus", label: "Lotus" },
      { value: "Luxgen", label: "Luxgen" },
      { value: "Magna Steyr", label: "Magna Steyr" },
      { value: "Mahindra", label: "Mahindra" },
      { value: "Maserati", label: "Maserati" },
      { value: "Maxus", label: "Maxus" },
      { value: "Maybach", label: "Maybach" },
      { value: "Mazda", label: "Mazda" },
      { value: "Mazzanti", label: "Mazzanti" },
      { value: "McLaren", label: "McLaren" },
      { value: "Mercedes-Benz", label: "Mercedes-Benz" },
      { value: "MG", label: "MG" },
      { value: "Mini", label: "Mini" },
      { value: "Mitsubishi", label: "Mitsubishi" },
      { value: "Mitsuoka", label: "Mitsuoka" },
      { value: "Morgan", label: "Morgan" },
      { value: "Morris", label: "Morris" },
      { value: "NIO", label: "NIO" },
      { value: "Nissan", label: "Nissan" },
      { value: "Noble", label: "Noble" },
      { value: "Opel", label: "Opel" },
      { value: "Pagani", label: "Pagani" },
      { value: "Perodua", label: "Perodua" },
      { value: "Peugeot", label: "Peugeot" },
      { value: "Polestar", label: "Polestar" },
      { value: "Pontiac", label: "Pontiac" },
      { value: "Porsche", label: "Porsche" },
      { value: "Proton", label: "Proton" },
      { value: "Ram", label: "Ram" },
      { value: "Reliant", label: "Reliant" },
      { value: "Renault", label: "Renault" },
      { value: "Rimac", label: "Rimac" },
      { value: "Rivian", label: "Rivian" },
      { value: "Rolls-Royce", label: "Rolls-Royce" },
      { value: "RUF", label: "RUF" },
      { value: "Saab", label: "Saab" },
      { value: "Saleen", label: "Saleen" },
      { value: "Saturn", label: "Saturn" },
      { value: "Scion", label: "Scion" },
      { value: "SEAT", label: "SEAT" },
      { value: "Senova", label: "Senova" },
      { value: "SIN Cars", label: "SIN Cars" },
      { value: "Skoda", label: "Skoda" },
      { value: "Smart", label: "Smart" },
      { value: "Spyker", label: "Spyker" },
      { value: "Ssangyong", label: "Ssangyong" },
      { value: "Subaru", label: "Subaru" },
      { value: "Suzuki", label: "Suzuki" },
      { value: "Tata", label: "Tata" },
      { value: "Tatra", label: "Tatra" },
      { value: "Tesla", label: "Tesla" },
      { value: "Toyota", label: "Toyota" },
      { value: "Trumpchi", label: "Trumpchi" },
      { value: "TVR", label: "TVR" },
      { value: "Vauxhall", label: "Vauxhall" },
      { value: "Volkswagen", label: "Volkswagen" },
      { value: "Volvo", label: "Volvo" },
      { value: "W Motors", label: "W Motors" },
      { value: "Wiesmann", label: "Wiesmann" },
      { value: "Zenos", label: "Zenos" },
      { value: "Zenvo", label: "Zenvo" },
    ];
  };

  getCarYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 3; // End year for the options (add 3 for future years)
    const startYear = 1960; // Start year for the options

    const yearOptions = [];

    for (let year = endYear; year >= startYear; year--) {
      yearOptions.push({ value: year, label: String(year) });
    }

    return yearOptions;
  };

  getCarDrivetrainOptions = () => {
    return [
      { value: "AWD", label: "AWD" },
      { value: "FWD", label: "FWD" },
      { value: "RWD", label: "RWD" },
      { value: "4WD", label: "4WD" },
    ];
  };

  getCarTransmissionOptions = () => {
    return [
      { value: "Manual", label: "Manual" },
      { value: "Automatic", label: "Automatic" },
      { value: "6-speed automatic", label: "6-speed automatic" },
      { value: "8-speed automatic", label: "8-speed automatic" },
      { value: "10-speed automatic", label: "10-speed automatic" },
      { value: "Continously Variable", label: "Continously Variable" },
      {
        value: "Semi Automatic/Dual Clutch",
        label: "Semi Automatic/Dual Clutch",
      },
    ];
  };

  getCarEngineOptions = () => {
    return [
      { value: "2-Cyl", label: "2-Cyl" },
      { value: "3-Cyl", label: "3-Cyl" },
      { value: "4-Cyl", label: "4-Cyl" },
      { value: "5-Cyl", label: "5-Cyl" },
      { value: "6-Cyl", label: "6-Cyl" },
      { value: "8-Cyl", label: "8-Cyl" },
      { value: "12-Cyl", label: "12-Cyl" },
    ];
  };

  getCarDoorOptions = () => {
    return [
      { value: 2, label: "2-Door" },
      { value: "4", label: "4-Door" },
    ];
  };
  getCarColorOptions = () => {
    return [
      { value: "Black", label: "Black" },
      { value: "Silver", label: "Silver" },
      { value: "Gray", label: "Gray" },
      { value: "Brown", label: "Brown" },
      { value: "White", label: "White" },
      { value: "Maroon", label: "Maroon" },
      { value: "Red", label: "Red" },
      { value: "Purple", label: "Purple" },
      { value: "Fuchsia", label: "Fuchsia" },
      { value: "Green", label: "Green" },
      { value: "Lime", label: "Lime" },
      { value: "Olive", label: "Olive" },
      { value: "Yellow", label: "Yellow" },
      { value: "Navy", label: "Navy" },
      { value: "Blue", label: "Blue" },
      { value: "Teal", label: "Teal" },
      { value: "Aqua", label: "Aqua" },
      { value: "Tan", label: "Tan" },
      { value: "Gold", label: "Gold" },
      { value: "Beige", label: "Beige" },
      { value: "Orange", label: "Orange" },
      { value: "Beige", label: "Beige" },
    ];
  };

  getFeaturedListingOptions = () => {
    return [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ];
  };

  getSoldListingOptions = () => {
    return [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ];
  };
  getApplicantHousingOptions = () => {
    return [
      { value: "Rent", label: "Rent" },
      { value: "Own", label: "Own" },
      { value: "Other", label: "Other" },
    ];
  };
}

export default new SelectOptionsService();
