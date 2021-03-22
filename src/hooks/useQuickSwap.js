import { getQuickSwapRouterContract } from '@services/contract.service';
import { ethers } from 'ethers';

import config from '@utils/config';
import { useSelector } from 'react-redux';
import { getAccount } from '@selectors/user.selectors';
import { useCallback, useState } from 'react';
import usePollar from './usePollar';
import { convertToWei } from '@helpers/price.helpers';
import { formatEther } from '@ethersproject/units';

export function useRatio() {
  const path = [config.MONA_TOKEN_ADDRESSES.matic, config.USDT_ADDRESS.matic];

  const [ratio, setRatio] = useState('0');
  const account = useSelector(getAccount);

  const fetchRatio = useCallback(async () => {
    const quickSwapRouter = await getQuickSwapRouterContract();

    setRatio(
      formatEther(
        (
          await quickSwapRouter.methods
            .getAmountsOut(convertToWei('1'), path)
            .call({ from: account })
        )[1]
      )
    );
  });

  usePollar(fetchRatio);

  return parseFloat(ratio);
}

export function useQuickSwap() {
  const account = useSelector(getAccount);

  const swapCallback = useCallback(
    async (firstAmount, secondAmount, toMona = true, baseFirst = true, slippage = 1) => {
      const path = !toMona
        ? [config.MONA_TOKEN_ADDRESSES.matic, config.USDT_ADDRESS.matic]
        : [config.USDT_ADDRESS.matic, config.MONA_TOKEN_ADDRESSES.matic];

      const quickSwapRouter = await getQuickSwapRouterContract();

      // if (baseFirst) {
      quickSwapRouter.methods
        .swapExactTokensForTokens(
          ethers.utils.parseUnits(firstAmount, 18),
          ethers.utils.parseUnits((parseFloat(secondAmount) * (100 - slippage)) / 100 + '', 18),
          path,
          account,
          Math.floor(Date.now() / 500)
        )
        .send({ from: account });
      // } else {
      //   quickSwapRouter.methods
      //     .swapTokensForExactTokens(
      //       ethers.utils.parseUnits(secondAmount, 18),
      //       ethers.utils.parseUnits((parseFloat(firstAmount) * (100 + slippage)) / 100 + '', 18),
      //       path,
      //       account,
      //       Date.now() / 500
      //     )
      //     .send({ from: account });
      // }
    },
    [account]
  );

  return { swapCallback };
}
