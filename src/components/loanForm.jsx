import React, { useState } from "react";

const LoanForm = () => {
    const [loanPurpose, setLoanPurpose] = useState("Purchase"); // Default purpose
    const [formData, setFormData] = useState({
        zipCode: "",
        purchasePrice: "",
        downPayment: "",
        creditScore: "",
        refinanceAmount: "",
        propertyType: "Single Family Home",
        residencyUsage: "Primary Home",
        loanType: "Conventional",
        eligibleRate: "No",
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    // Property options
    const propertyTypes = [
        "Single Family Home",
        "Townhome",
        "Condominium",
        "Multi Unit Home",
        "Manufactured Home",
    ];

    const residencyUsageOptions = ["Primary Home", "Second Home", "Rental Home"];

    const loanTypes = ["Conventional", "VA", "FHA", "USDA", "ARM"];

    const eligibleRateOptions = [
        "Yes",
        "I'm a first-time homebuyer and earn under 80% of the county's median income.",
        "No",
    ];

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!formData.zipCode) errors.zipCode = "Zip Code is required";

        if (loanPurpose === "Purchase") {
            if (!formData.purchasePrice)
                errors.purchasePrice = "Purchase Price is required";
            if (!formData.downPayment) errors.downPayment = "Down Payment is required";
        } else if (loanPurpose === "Refinance") {
            if (!formData.refinanceAmount)
                errors.refinanceAmount = "Refinance Amount is required";
        }

        if (!formData.creditScore) errors.creditScore = "Credit Score is required";
        return errors;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            setSuccess("");

            // Create payload
            const payload = {
                loanPurpose,
                ...formData,
                ...(loanPurpose === "Purchase"
                    ? {
                        purchasePrice: formData.purchasePrice,
                        downPayment: formData.downPayment,
                    }
                    : {
                        refinanceAmount: formData.refinanceAmount,
                    }),
            };

            // Dummy API Call
            try {
                console.log("Sending payload to API:", payload);
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setSuccess("Data successfully submitted!");
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 space-y-4 pt-40">
            <h2 className="text-xl font-bold text-gray-700">Loan Details Form</h2>

            {/* Loan Purpose Toggle */}
            <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={() => setLoanPurpose("Purchase")}
                    className={`py-2 px-4 rounded-md ${loanPurpose === "Purchase"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Purchase
                </button>
                <button
                    type="button"
                    onClick={() => setLoanPurpose("Refinance")}
                    className={`py-2 px-4 rounded-md ${loanPurpose === "Refinance"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Refinance
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Common Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full border ${formErrors.zipCode ? "border-red-500" : "border-gray-300"
                            } p-2 rounded-md focus:outline-none`}
                    />
                    {formErrors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
                    )}
                </div>

                {loanPurpose === "Purchase" && (
                    <>
                        {/* Purchase Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Purchase Price
                            </label>
                            <input
                                type="number"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleChange}
                                className={`w-full border ${formErrors.purchasePrice ? "border-red-500" : "border-gray-300"
                                    } p-2 rounded-md focus:outline-none`}
                            />
                            {formErrors.purchasePrice && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.purchasePrice}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Down Payment
                            </label>
                            <input
                                type="number"
                                name="downPayment"
                                value={formData.downPayment}
                                onChange={handleChange}
                                className={`w-full border ${formErrors.downPayment ? "border-red-500" : "border-gray-300"
                                    } p-2 rounded-md focus:outline-none`}
                            />
                            {formErrors.downPayment && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.downPayment}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {loanPurpose === "Refinance" && (
                    <>
                        {/* Refinance Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Refinance Amount
                            </label>
                            <input
                                type="number"
                                name="refinanceAmount"
                                value={formData.refinanceAmount}
                                onChange={handleChange}
                                className={`w-full border ${formErrors.refinanceAmount
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } p-2 rounded-md focus:outline-none`}
                            />
                            {formErrors.refinanceAmount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.refinanceAmount}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* Common Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Credit Score
                    </label>
                    <input
                        type="number"
                        name="creditScore"
                        value={formData.creditScore}
                        onChange={handleChange}
                        className={`w-full border ${formErrors.creditScore ? "border-red-500" : "border-gray-300"
                            } p-2 rounded-md focus:outline-none`}
                    />
                    {formErrors.creditScore && (
                        <p className="text-red-500 text-sm mt-1">
                            {formErrors.creditScore}
                        </p>
                    )}
                </div>

                {/* Dropdown fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Property Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Property Type
                        </label>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                        >
                            {propertyTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Residency Usage */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Residency Usage
                        </label>
                        <select
                            name="residencyUsage"
                            value={formData.residencyUsage}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                        >
                            {residencyUsageOptions.map((usage) => (
                                <option key={usage} value={usage}>
                                    {usage}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Loan Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Loan Type
                        </label>
                        <select
                            name="loanType"
                            value={formData.loanType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                        >
                            {loanTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Eligible Rate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Eligible Rate
                        </label>
                        <select
                            name="eligibleRate"
                            value={formData.eligibleRate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                        >
                            {eligibleRateOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-white font-medium rounded-md ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

                {/* Success Message */}
                {success && (
                    <p className="text-green-500 text-sm font-medium mt-2">{success}</p>
                )}
            </form>
        </div>
    );
};

export default LoanForm;
