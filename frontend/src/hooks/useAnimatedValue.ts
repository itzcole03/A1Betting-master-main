import { useState, useEffect, useRef, useCallback } from 'react.ts';



interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  precision?: number;
}

interface AnimationConfig {
  duration?: number;
  spring?: SpringConfig;
  onComplete?: () => void;
}

const defaultSpringConfig: SpringConfig = {
  stiffness: 170,
  damping: 26,
  mass: 1,
  precision: 0.01;
};

export function useAnimatedValue(
  initialValue: number,
  config: AnimationConfig = {}
) {
  const [value, setValue] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);






  const cancelAnimation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }
    setIsAnimating(false);
  }, []);

  const animateSpring = useCallback(() => {
    const animate = () => {





      velocityRef.current = newVelocity;

      if (
        Math.abs(dx) < (spring.precision || 0.01) &&
        Math.abs(newVelocity) < (spring.precision || 0.01)
      ) {
        setValue(targetValueRef.current);
        cancelAnimation();
        config.onComplete?.();
        return;
      }

      setValue(newValue);
      frameRef.current = requestAnimationFrame(animate);
    };

    setIsAnimating(true);
    frameRef.current = requestAnimationFrame(animate);
  }, [value, config, cancelAnimation]);

  const animateLinear = useCallback(
    (target: number, duration: number) => {

      startTimeRef.current = startTime;
      startValueRef.current = value;
      targetValueRef.current = target;

      const animate = (currentTime: number) => {


        if (progress === 1) {
          setValue(target);
          cancelAnimation();
          config.onComplete?.();
          return;
        }

        setValue(
          startValueRef.current + (target - startValueRef.current) * progress;
        );
        frameRef.current = requestAnimationFrame(animate);
      };

      setIsAnimating(true);
      frameRef.current = requestAnimationFrame(animate);
    },
    [value, config, cancelAnimation]
  );

  const animateTo = useCallback(
    (target: number, newConfig: AnimationConfig = {}) => {
      cancelAnimation();

      const mergedConfig = {
        ...config,
        ...newConfig;
      };

      targetValueRef.current = target;

      if (mergedConfig.duration) {
        animateLinear(target, mergedConfig.duration);
      } else {
        springConfigRef.current = mergedConfig.spring || defaultSpringConfig;
        animateSpring();
      }
    },
    [config, animateLinear, animateSpring, cancelAnimation]
  );

  const jumpTo = useCallback((target: number) => {
    cancelAnimation();
    setValue(target);
    targetValueRef.current = target;
    velocityRef.current = 0;
  }, [cancelAnimation]);

  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return {
    value,
    isAnimating,
    animateTo,
    jumpTo,
    cancel: cancelAnimation;
  };
}

// Example usage:
/*
function AnimatedCounter({ value }: { value: number }) {
  const { value: animatedValue, animateTo } = useAnimatedValue(0, {
    spring: {
      stiffness: 150,
      damping: 15,
      mass: 1;
    }
  });

  useEffect(() => {
    animateTo(value);
  }, [value, animateTo]);

  return <div>{Math.round(animatedValue)}</div>;
}

function AnimatedProgress({ progress }: { progress: number }) {
  const { value: width, animateTo } = useAnimatedValue(0, {
    duration: 1000,
    onComplete: () => // console statement removed
  });

  useEffect(() => {
    animateTo(progress * 100);
  }, [progress, animateTo]);

  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div;
        className="h-full bg-blue-500 rounded"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
*/ 