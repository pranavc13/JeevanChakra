const healthTips = [
    "🌱 Start your day with warm lemon water",
    "🍶 Stay hydrated with at least 8 glasses of water daily",
    "🧘‍♀️ Practice 10 minutes of morning yoga",
    "🥗 Include seasonal vegetables in your meals",
    "⏰ Maintain consistent meal timings",
    "🌿 Include herbs like tulsi and ginger in your diet"
];

const mealPlans = {
    "Breakfast": [{ meal: "Oatmeal", calories: 150 }, { meal: "Fruit Salad", calories: 100 }],
    "Lunch": [{ meal: "Vegetable Curry", calories: 300 }, { meal: "Brown Rice", calories: 200 }],
    "Dinner": [{ meal: "Grilled Chicken", calories: 350 }, { meal: "Salad", calories: 150 }]
};

document.getElementById('bmiTab').addEventListener('click', () => showTab('bmi'));
document.getElementById('mealTab').addEventListener('click', () => showTab('meal'));
document.getElementById('medsTab').addEventListener('click', () => showTab('meds'));

document.getElementById('calculateBMI').addEventListener('click', calculateBMI);
document.getElementById('addMed').addEventListener('click', addMedication);

// Initialize meal plans
displayMealPlans();

function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tab}Section`).classList.add('active');

    document.querySelectorAll('nav button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${tab}Tab`).classList.add('active');
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const units = document.getElementById('units').value;

    if (!weight || !height) {
        alert('Please enter both weight and height');
        return;
    }

    let heightInMeters = units === 'inches' ? (height * 0.0254) : (height / 100);
    let weightInKg = units === 'inches' ? (weight * 0.453592) : weight;
    
    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);

    document.getElementById('bmiValue').innerText = bmi;
    document.getElementById('bmiCategory').innerText = getBMICategory(bmi);
    document.getElementById('healthTips').innerHTML = healthTips.map(tip => `<div>${tip}</div>`).join('');
    document.getElementById('bmiResult').classList.remove('hidden');
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function displayMealPlans() {
    for (const [mealTime, meals] of Object.entries(mealPlans)) {
        const mealContainer = document.getElementById(`${mealTime.toLowerCase()}Plan`);
        mealContainer.innerHTML = meals.map(meal => `
            <div class="meal-item">
                <div class="fw-bold">${meal.meal}</div>
                <div class="text-muted">${meal.calories} calories</div>
            </div>
        `).join('');
    }
}

function addMedication() {
    const name = document.getElementById('medName').value;
    const time = document.getElementById('medTime').value;
    const frequency = document.getElementById('medFrequency').value;

    if (!name || !time) {
        alert('Please enter both medication name and time');
        return;
    }

    const medItem = document.createElement('div');
    medItem.innerHTML = `<strong>${name}</strong> at ${time} (${frequency})`;
    document.getElementById('medicationsList').appendChild(medItem);
    
    // Clear inputs
    document.getElementById('medName').value = '';
    document.getElementById('medTime').value = '';
}

// Initialize the app by showing the BMI tab
showTab('bmi');
