//Holiday Card to CSV

// Expected end format:
//Name on Envelope;Street Address 1;Street Address 2 (Optional);City;State/Region;Zip/Postal Code;Country
//val;val;val;val;val;etc...


const Keys = {
    Name: 'Name on Envelope',
    City: 'City',
    State: 'State/Region',
    Zip: 'Zip/Postal',
    Street1: 'Street Address 1',
    Street2: 'Street Address 2 (Optional)',
    Country: 'Country',
}

function convertToCsvFormat(obj) {
    return [
        obj[Keys.Name],
        obj[Keys.Street1],
        obj[Keys.Street2] || '',
        obj[Keys.City],
        obj[Keys.State],
        obj[Keys.Zip],
        obj[Keys.Country]
    ].join(';');
}

function convertToLabeledParts(input) {
    return input.split('\n').reduce((acc, val, index, arr) => {
        const isLastLine = (index + 1) === arr.length;

        if (index === 0) {
            acc[Keys.Name]  = val.trim();
        } else if (isLastLine) {
            try {
                const [full, city, state, zip] = /(.*), (\D*)(\d{5})/gm.exec(val);
                acc[Keys.City] = city;
                acc[Keys.State] = state.trim();
                acc[Keys.Zip] = zip;
            } catch (e) {
                console.error(`CAN'T PARSE THE FOLLOWING VALUE: ${val}`);
            }
        } else if (index === 1) {
            acc[Keys.Street1] = val.trim();
        } else {
            acc[Keys.Street2] = val;
        }

        return acc;
    }, {[Keys.Country]: 'USA'});
}

let all = [
`Me & You
100 Blue Hollow
Springfield, Virginia 22152`,

`Small & Big Little
88 Washington Street #144 
Stamford, Connecticut 06902 `,

`Liberty Family
1 Queens Lane 
St. Louis Missouri 63132`,

`Peanut Butter Reece
89 Weaver Street
Columbus, OH 43230`,
];

copy(all.map(convertToLabeledParts).map(convertToCsvFormat).join('\n'));
