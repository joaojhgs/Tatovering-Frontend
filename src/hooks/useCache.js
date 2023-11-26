import React, { createContext, useContext, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const CacheContext = createContext();

const CacheProvider = ({ children }) => {
    const [cache, setCache] = useState({});

    /**
     * Função que armazena um cache
     * @param {string} key Identificador único do cache
     * @param {any} data Dados a serem armazenados
     * @param {{
     *  maxAgeInMinutes: number
     * }} options Opcoes do cache
     */
    const setCacheItem = (
        key,
        data,
        options = {
            maxAgeInMinutes: 5,
        }
    ) => {
        setCache(prevCache => ({
            ...prevCache,
            [key]: {
                data,
                timestamp: moment(),
                maxAgeInMinutes: options.maxAgeInMinutes,
            },
        }));
    };

    const isCacheExpired = (timestamp, maxAge) => moment().diff(timestamp, 'minutes') <= maxAge;

    /**
     * Função que retorna o cache, caso o tempo não tenha expirado
     * @param {string} key Identificador único do cache
     * @returns {{
     *  data: any,
     *  timestamp: Date,
     *  maxAgeInMinutes: number,
     * }}
     */
    const getCacheItem = key => {
        const cachedData = cache[key];
        if (cachedData && isCacheExpired(cachedData.timestamp, cachedData.maxAgeInMinutes)) {
            return cachedData;
        }
        return null;
    };

    return (
        <CacheContext.Provider value={{ cache, setCacheItem, getCacheItem }}>
            {children}
        </CacheContext.Provider>
    );
};

CacheProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * Função que encapsula o gerencimento do cache de requisições
 * @param {string} key Identificador único do cache
 * @returns {[
 *  {
 *    key: string,
 *    data: any,
 *    timestamp: Date,
 *    options: {
 *     maxAgeInMinutes: number,
 *    }
 *  },
 *  (data: any, options: { maxAgeInMinutes: number }) => void
 * ]} [cachedData, setCache]
 */
export default function useCache(key) {
    const { setCacheItem, getCacheItem } = useContext(CacheContext);

    const cachedData = getCacheItem(key);

    const setCachedData = (data, options) => {
        setCacheItem(key, data, options);
    };

    return [cachedData, setCachedData];
}

export { CacheProvider };
