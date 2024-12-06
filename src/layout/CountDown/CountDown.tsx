import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  if (timeLeft.total <= 0) {
    return <Wrapper>🎉 The event has started! 🎉</Wrapper>;
  }

  return (
    <Wrapper>
      <TimeDisplay>
        <TimeBlock>
          <Number>{timeLeft.days}</Number>
          <Label>Days</Label>
        </TimeBlock>
        <TimeBlock>
          <Number>{timeLeft.hours}</Number>
          <Label>Hours</Label>
        </TimeBlock>
        <TimeBlock>
          <Number>{timeLeft.minutes}</Number>
          <Label>Minutes</Label>
        </TimeBlock>
        <TimeBlock>
          <Number>{timeLeft.seconds}</Number>
          <Label>Seconds</Label>
        </TimeBlock>
      </TimeDisplay>
    </Wrapper>
  );
};

function calculateTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  return {
    total: distance,
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

const Wrapper = styled.div`
  font-family: 'SUITE-Regular', sans-serif;
  padding: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Number = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #333333;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #555555;
`;

export default CountdownTimer;
