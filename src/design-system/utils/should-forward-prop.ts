const defaultBlacklist = ['color', 'width', 'height', 'spacing', 'display', 'fontFamily', 'fontSize'];

type ShouldForwardProp = (name: React.ReactText, defaultValidator: (p: React.ReactText) => boolean) => boolean;

export const shouldForwardProp: ShouldForwardProp = (name, defaultValidator) =>
    defaultBlacklist.includes(name as string) ? false : defaultValidator(name);

type CreateShouldForwardProp = (
    blacklist: Array<string>,
) => (name: React.ReactText, defaultValidator: (p: React.ReactText) => boolean) => boolean;

export const createShouldForwardProp: CreateShouldForwardProp = (blacklist) => (name, defaultValidator) =>
    blacklist.includes(name as string) ? false : defaultValidator(name);
