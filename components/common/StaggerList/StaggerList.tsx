import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';

interface StaggerListProps {
  delayPerItem?: number;
  numItems: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode[];
}

export function StaggerList(props: StaggerListProps) {
  const { delayPerItem = 0.001 } = props;
  const originOffset = React.useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }

    controls.start(hasAnimated ? 'visibleNext' : 'visible');
  }, [controls, hasAnimated, props.children]);

  return (
    <motion.div
      initial={hasAnimated ? 'hiddenNext' : 'hidden'}
      animate={controls}
      variants={{}}
      className={props.className}
      style={props.style}
    >
      {React.Children.map(props.children, (child, idx) => {
        return (
          <StaggerListItem
            key={idx}
            idx={idx}
            originIndex={0}
            delayPerItem={delayPerItem}
            originOffset={originOffset}
            hasAnimated={hasAnimated}
          >
            {child}
          </StaggerListItem>
        );
      })}
    </motion.div>
  );
}

interface StaggerListItemProps {
  idx: number;
  delayPerItem: number;
  originIndex: number;
  originOffset: React.MutableRefObject<{
    top: number;
    left: number;
  }>;
  hasAnimated?: boolean;
  children?: React.ReactNode;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  visible: (delayRef: React.MutableRefObject<number>) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delayRef.current }
  }),
  // Animation for next rerenders to avoid layout shift
  hiddenNext: {
    opacity: 0
  },
  visibleNext: (delayRef: React.MutableRefObject<number>) => ({
    opacity: 1,
    transition: { delay: delayRef.current }
  })
};

function StaggerListItem(props: StaggerListItemProps) {
  const delayRef = React.useRef(0);
  const offset = React.useRef({ top: 0, left: 0 });
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    if (!ref.current || props.hasAnimated) return;

    const element = ref.current as HTMLDivElement;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft
    };

    if (props.idx === props.originIndex) {
      props.originOffset.current = offset.current;
    }
  }, [props.delayPerItem, props.hasAnimated, props.idx, props.originIndex, props.originOffset]);

  React.useEffect(() => {
    const dx = Math.abs(offset.current.left - props.originOffset.current.left);
    const dy = Math.abs(offset.current.top - props.originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * props.delayPerItem;
  }, [props.delayPerItem, props.originOffset]);

  return (
    <motion.div ref={ref} variants={itemVariants} custom={delayRef}>
      {props.children}
    </motion.div>
  );
}
