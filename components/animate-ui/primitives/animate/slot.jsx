'use client';
/* eslint-disable react-hooks/static-components */

import * as React from 'react';
import { motion, isMotionComponent } from 'motion/react';
import { cn } from '@/lib/utils';

const motionComponentCache = new WeakMap();
const motionElementCache = new Map();

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

function mergeProps(childProps, slotProps) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...childProps.style,
      ...slotProps.style,
    };
  }

  return merged;
}

function getMotionComponent(type) {
  if (typeof type === 'string') {
    if (!motionElementCache.has(type)) {
      motionElementCache.set(type, motion.create(type));
    }

    return motionElementCache.get(type);
  }

  if (!motionComponentCache.has(type)) {
    motionComponentCache.set(type, motion.create(type));
  }

  return motionComponentCache.get(type);
}

const Slot = React.forwardRef(function Slot({ children, ...props }, ref) {
  if (!React.isValidElement(children)) return null;

  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = isAlreadyMotion ? children.type : getMotionComponent(children.type);
  const { ref: childRef, ...childProps } = children.props;
  const mergedProps = mergeProps(childProps, props);

  return <Base {...mergedProps} ref={mergeRefs(childRef, ref)} />;
});

export { Slot };
