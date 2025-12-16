-- Lua filter for pandoc to convert GitHub-style alerts to HTML
function BlockQuote(el)
  local first = el.content[1]
  if first and first.t == "Para" then
    local first_elem = first.content[1]
    if first_elem and first_elem.t == "Str" then
      local text = pandoc.utils.stringify(first)
      local alert_type = text:match("^%[!(%w+)%]")
      
      if alert_type then
        -- Remove the alert marker from content
        table.remove(first.content, 1)  -- Remove [!TYPE]
        if first.content[1] and first.content[1].t == "Space" then
          table.remove(first.content, 1)  -- Remove space after marker
        end
        
        -- Map alert types to styles
        local alert_map = {
          Note = {class = "note", icon = "ℹ️", title = "Note"},
          Tip = {class = "tip", icon = "💡", title = "Tip"},
          Important = {class = "important", icon = "❗", title = "Important"},
          Warning = {class = "warning", icon = "⚠️", title = "Warning"},
          Caution = {class = "caution", icon = "🔥", title = "Caution"}
        }
        
        local alert = alert_map[alert_type]
        if alert then
          local html = string.format([[
<div class="alert alert-%s">
  <div class="alert-title">%s %s</div>
  <div class="alert-content">
]], alert.class, alert.icon, alert.title)
          
          -- Add the content
          for i = 1, #el.content do
            html = html .. pandoc.write(pandoc.Pandoc({el.content[i]}), 'html')
          end
          
          html = html .. [[
  </div>
</div>
]]
          return pandoc.RawBlock('html', html)
        end
      end
    end
  end
  return el
end
