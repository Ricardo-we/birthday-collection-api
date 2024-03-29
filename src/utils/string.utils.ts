import { safeDateParse } from "./date.utils";

export function getSentenceCutter(
	sentenceLength: number = 5,
	removeCharacters = { regExp: /\s+\-/g, value: "" }
) {
	return (value: string) => {
		const valueAsArray = value.split(" ").slice(0, sentenceLength);
		let joinedValue = valueAsArray.join(" ");
		if (removeCharacters) {
			const { regExp, value } = removeCharacters;
			joinedValue = joinedValue.replace(regExp, value);
		}
		return joinedValue;
	};
}

export function firstLetterUpperCase(word: string) {
	const firstLetterUpperCase = word.charAt(0).toUpperCase();
	return firstLetterUpperCase + word.substring(1);
}

export function parseToDateOrNumber(value: string) {
	try {
		let parsedValue = parseInt(value);
		if (value.includes("-") || value?.includes("/") || value?.includes(":"))
			return safeDateParse(value).getTime();
		if (isNaN(parsedValue)) return 0;

		return parsedValue;
	} catch (error) {
		return value.length;
	}
}

export function replaceWithList(
	value: string,
	replaceValues: Array<string | any>,
	replaceToken: string = "?"
) {
	let result = "";
	const splittedWord = value?.split(replaceToken);

	for (let i = 0; i < splittedWord?.length; i++) {
		const replaceValue =
			i < replaceValues.length - 1
				? replaceValues[i]
				: replaceValues[replaceValues.length - 1];
		// if(splittedWord) result += splittedWord[i];
		if (splittedWord.length === 0 || i >= splittedWord.length - 1) {
			result += splittedWord[i];
			continue;
		}
		result += splittedWord[i] + replaceValue;
	}

	return result;
}

export function formatForSqlLikeClause(text: string) {
	return text.replace(/%/g, "\\\\%").replace(/\s/g, "%");
}

export function generateRandomCode(size=10){
	return Math.random().toString(36).substring(2,size + 2)
}