import { useCallback, useState } from 'react';

export type IUseRequestAction<Input, Output> = (
  variables?: Input,
) => Promise<Output>;

/**
 * @description Hook to handle request with a loading state
 * @property {IUseRequestAction<Input, Output>} [action] Controller action to perform request
 * @example
 * const [request, isLoading] = useRequest(
 *   controller.findData
 * );
 */
export const useRequest = <Input, Output>(
  action: IUseRequestAction<Input, Output>,
): [IUseRequestAction<Input, Output>, boolean, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const request = useCallback<IUseRequestAction<Input, Output>>((variables) => {
    setIsLoading(true);

    const response = new Promise<Output>((resolve, reject) => {
      action(variables)
        .then((data) => {
          resolve(data);
          setIsLoading(false);
          setHasError(false);
        })
        .catch((err) => {
          reject(err);
          setHasError(true);
          setIsLoading(false);
        });
    });

    return response;
  }, []);

  return [request, isLoading, hasError];
};
