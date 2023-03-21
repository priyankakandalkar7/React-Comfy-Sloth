export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat("en-IN",{
        style:'currency',
        currency:'INR'
    }).format((number));
    return newNumber;


}

export const getUniqueValues = () => {}
