export function toQuery(params: Record<string, any>) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    if (Array.isArray(v)) v.forEach(x => usp.append(k, String(x)));
    else if (typeof v === 'object') usp.append(k, JSON.stringify(v));
    else usp.append(k, String(v));
  });
  return usp.toString();
}
