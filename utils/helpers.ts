export const roundNumber = (number: number) => {
	const roundedNumber = parseFloat(number.toFixed(2));
	const result = roundedNumber.toString().replace(/(\.0{1,2})$/, "");
	return parseFloat(result);
};
