declare namespace Environment {
  type Configuration = {
    DEBUG: boolean;
    MODE: 'production' | 'develop' | 'test';
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    MODE?: Environment.Configuration['MODE'];
    DEBUG?: 'true' | 'false' | '0' | '1';
  }
}


/**
 * A record of a minimum and maximum value.
 */
type MinMax = Record<'min' | 'max', number>;
