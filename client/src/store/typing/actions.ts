export const incrementMistakes = (mistake: string) => ({
   type: 'incrementMistakes' as const,
   payload: mistake,
});

export const creditKeypress = () => ({
   type: 'creditKeypress' as const,
});

export const setTimeSpent = (time: number) => ({
   type: 'setTimeSpent' as const,
   payload: time,
});

export const setStartSentence = () => ({
   type: 'setStartSentence' as const,
});

export const setIsTypingDone = (isTypingDone: boolean) => ({
   type: 'setIsTypingDone' as const,
   payload: isTypingDone,
});

export const setTextIndex = (index: string) => ({
   type: 'setTextIndex' as const,
   payload: index,
});

export const setMisprintKey = (misprintKey: string) => ({
   type: 'setMisprintKey' as const,
   payload: misprintKey,
});


export const resetState = () => ({
   type: 'resetState' as const
});

