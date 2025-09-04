import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyPromoThunk } from '@/features/promos/promosSlice';
import { selectAppliedPromo, selectApplyingPromo, selectApplyPromoError } from '@/features/promos/promos.selectors';

/** Thin wrapper around apply promo for checkout */
export function usePromoApply() {
  const dispatch = useAppDispatch();
  const applied = useAppSelector(selectAppliedPromo);
  const applying = useAppSelector(selectApplyingPromo);
  const error = useAppSelector(selectApplyPromoError);

  const apply = (args: { code: string; vendorId?: number; cartTotal: number; deliveryFee?: number; currency: 'LBP'|'USD' }) =>
    dispatch(applyPromoThunk(args as any));

  return { applied, applying, error, apply };
}

