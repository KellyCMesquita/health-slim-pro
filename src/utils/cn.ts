/**
 * Class Name Utilities
 * Utilitários para manipulação de classes CSS
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
