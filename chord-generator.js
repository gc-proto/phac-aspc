const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const intervalsMajor = [2, 2, 1, 2, 2, 2, 1];
const intervalsMinor = [2, 1, 2, 2, 1, 2, 2];
const progressionsMajor = [
    ['I', 'IV', 'V'],
    ['ii', 'V', 'I'],
    ['I', 'vi', 'IV', 'V'],
    ['I', 'IV', 'ii', 'V'],
    ['I', 'iii', 'IV', 'V'],
    ['vi', 'IV', 'I', 'V'],
    ['I', 'V', 'vi', 'IV'],
    ['I', 'IV', 'I', 'V'],
    ['I', 'iii', 'vi', 'IV'],
];
const progressionsMinor = [
    ['i', 'iv', 'v'],
    ['ii°', 'v', 'i'],
    ['i', 'VI', 'III', 'VII'],
    ['i', 'iv', 'VII'],
    ['i', 'III', 'VII'],
    ['III', 'VII', 'i'],
    ['i', 'III', 'iv', 'VII'],
    ['VI', 'III', 'iv', 'VII'],
    ['i', 'iv', 'i', 'v'],
];

function getMajorScale(key) {
    const index = notes.indexOf(key);
    return intervalsMajor.map((interval, i) => notes[(index + intervalsMajor.slice(0, i).reduce((a, b) => a + b, 0)) % notes.length]);
}

function getMinorScale(key) {
    const index = notes.indexOf(key);
    return intervalsMinor.map((interval, i) => notes[(index + intervalsMinor.slice(0, i).reduce((a, b) => a + b, 0)) % notes.length]);
}

function generateChordProgressions(key, scaleType) {
    let scale;
    let progressions;
    let majorChords;
    let minorChords;

    if (scaleType.toLowerCase() === 'major') {
        scale = getMajorScale(key);
        progressions = progressionsMajor;
        majorChords = [1, 4, 5];
        minorChords = [2, 3, 6];
    } else if (scaleType.toLowerCase() === 'minor') {
        scale = getMinorScale(key);
        progressions = progressionsMinor;
        majorChords = [3, 6, 7];
        minorChords = [1, 2, 4, 5];
    } else {
        console.error("Invalid scale type. Choose either 'major' or 'minor'.");
        return;
    }

    const romanToInt = {
        'I': 1, 'ii': 2, 'iii': 3, 'IV': 4, 'V': 5, 'vi': 6, 'VII': 7,
        'i': 1, 'ii°': 2, 'III': 3, 'iv': 4, 'v': 5, 'VI': 6, 'VII': 7
    };
    const diminishedChords = [2];

    const generatedProgressions = [];
    const generatedRomanProgressions = [];

    // Pick 3 unique progressions
    const uniqueProgressions = randomSample([...progressions], 3); // Make a copy of progressions using spread operator

    for (const progression of uniqueProgressions) {
        const chords = [];
        for (const note of progression) {
            const index = romanToInt[note] - 1;
            if (majorChords.includes(romanToInt[note])) {
                chords.push(scale[index]);
            } else if (minorChords.includes(romanToInt[note])) {
                chords.push(scale[index] + 'm');
            } else if (diminishedChords.includes(romanToInt[note])) {
                chords.push(scale[index] + '°');
            }
        }
        generatedProgressions.push(chords);
        generatedRomanProgressions.push(progression);
    }

    return [generatedProgressions, generatedRomanProgressions];
}



function randomSample(arr, n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomElement = arr.splice(randomIndex, 1)[0];
        result.push(randomElement);
    }
    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    const keySelect = document.getElementById('key');
    for (const note of notes) {
        const option = document.createElement('option');
        option.value = note;
        option.innerText = note;
        keySelect.appendChild(option);
    }

    const form = document.getElementById('chord-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const key = keySelect.value;
        const scaleType = document.getElementById('scale-type').value;

        const [chordProgressions, romanProgressions] = generateChordProgressions(key, scaleType);

        if (chordProgressions) {
            chordProgressions.forEach((progression, index) => {
                const romanProgression = romanProgressions[index];

                document.getElementById(`progression${index + 1}Chords`).textContent = progression.join(' - ');
                document.getElementById(`progression${index + 1}Roman`).textContent = '(' + romanProgression.join(' - ') + ')';
            });
        }

        document.getElementById('output').style.display = 'block';
    });

    
});
