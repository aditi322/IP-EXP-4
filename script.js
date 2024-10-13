// Person class
class Person {
    constructor(name, mobile, email) {
        this.name = name;
        this.mobile = mobile;
        this.email = email;
    }

    printDetails() {
        console.log(`Name: ${this.name}, Mobile: ${this.mobile}, Email: ${this.email}`);
    }
}

// Student class that inherits from Person
class Student extends Person {
    constructor(name, mobile, email, rollNo) {
        super(name, mobile, email); // Calling the parent constructor
        if (rollNo === 0) {
            throw new Error('Roll number cannot be zero');
        }
        this.rollNo = rollNo;
    }

    // Overriding the printDetails method
    printDetails() {
        super.printDetails(); // Calling the parent method
        console.log(`Roll No: ${this.rollNo}`);
    }
}

// Form validation function
function validateFormData(name, mobile, email, message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = '';

    if (!/^\d{9}$/.test(mobile)) { // Check for exactly 9 digits
        errorElement.textContent = 'Mobile number must be 9 digits long.';
        return false;
    }
    if (message.length > 50) { // Check message length
        errorElement.textContent = 'Message cannot exceed 50 characters.';
        return false;
    }
    if (!validateEmail(email)) { // Email validation
        errorElement.textContent = 'Please enter a valid email address.';
        return false;
    }
    return true;
}

// Email validation function (simple regex check)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Process the order and generate receipt
function processOrder(event) {
    event.preventDefault(); // Prevent form submission refresh

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const message = document.getElementById('message').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;

    if (!validateFormData(name, mobile, email, message)) {
        return;
    }

    // Create a Person object and print the details
    const person = new Person(name, mobile, email);
    person.printDetails();

    // Generate receipt
    const receiptDiv = document.getElementById('receipt');
    const date = new Date().toLocaleString();
    receiptDiv.innerHTML = `
        <div class="receipt">
            <h3>Order Confirmation</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>T-shirt Size:</strong> ${size}</p>
            <p><strong>T-shirt Color:</strong> ${color}</p>
            <p><strong>Message on T-shirt:</strong> ${message}</p>
            <p><strong>Delivery Address:</strong> ${address}</p>
            <p><strong>Additional Notes:</strong> ${notes}</p>
            <p><strong>Order Date:</strong> ${date}</p>
        </div>
    `;
}

// Arrow function as a member function (demonstrating in form validation)
const checkMessageLength = (message) => message.length <= 50;

// Error handling example with Student class
try {
    const student = new Student('Aditi Taksale', '123456789', 'aditi@example.com', 0); // This will throw an error
    student.printDetails();
} catch (error) {
    console.error(error.message); // Display error message in console
}
