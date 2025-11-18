export function capitalize(sentence: string): string
{
    const newSentence: string | Array<string> = [];
    const words = sentence.split(" ");
    for (const word in words)
    {
        const capitalized1stLetter = words[word].charAt(0).toLocaleUpperCase();
        const remainingLetters = words[word].slice(1);
        const capitalizedWord = capitalized1stLetter + remainingLetters;
        newSentence.push(capitalizedWord);
        
    }

    return newSentence.join(" ");
}