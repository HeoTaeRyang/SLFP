import React, { useState } from 'react';

interface AnswerInputProps {
    onSubmit: (answer: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit }) => {
    const [answer, setAnswer] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(answer);
        setAnswer('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="선수 이름을 입력하세요"
            />
            <button type="submit">제출</button>
        </form>
    );
};

export default AnswerInput;